import { Injectable, computed, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { MedusaClientService } from '../../core/services/medusa-client.service';
import { B2BUser, B2BCompany, CompanyStatus, UserRole } from '../../core/models/domain/b2b-user.model';
import { LoginInput, B2BRegisterInput, AuthResponse } from '../../core/models/auth-dto.model';

/**
 * Application Layer: Auth Service (Facade)
 * Manages authentication state using Signals
 * Exposes readonly signals to components
 * Methods return Observables for the caller to handle
 */
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // Private writable signals (internal state)
  private readonly _user = signal<B2BUser | null>(null);
  private readonly _loading = signal<boolean>(false);
  private readonly _error = signal<string | null>(null);

  // Public readonly signals (exposed to components)
  public readonly user = this._user.asReadonly();
  public readonly loading = this._loading.asReadonly();
  public readonly error = this._error.asReadonly();

  // Computed signals for derived state
  public readonly isAuthenticated = computed(() => this._user() !== null);
  
  public readonly companyStatus = computed<CompanyStatus>(() => {
    const user = this._user();
    return user?.company?.status || 'pending';
  });
  
  public readonly isApproved = computed(() => this.companyStatus() === 'approved');
  public readonly isPending = computed(() => this.companyStatus() === 'pending');
  public readonly isRejected = computed(() => this.companyStatus() === 'rejected');
  
  public readonly companyName = computed(() => this._user()?.company?.name || '');
  public readonly userRole = computed<UserRole | null>(() => this._user()?.role || null);
  public readonly customerGroup = computed(() => this._user()?.groups?.[0] || null);
  
  public readonly fullName = computed(() => {
    const user = this._user();
    return user ? `${user.first_name} ${user.last_name}` : '';
  });

  constructor(
    private medusaClient: MedusaClientService,
    private router: Router
  ) {
    this.initializeAuthState();
  }

  /**
   * Initialize authentication state on service creation
   */
  private initializeAuthState(): void {
    this.medusaClient.getCurrentCustomer$().subscribe({
      next: (response) => {
        this.updateUserFromResponse(response);
      },
      error: () => {
        this._user.set(null);
      },
    });
  }

  /**
   * Login a user
   * Returns Observable for caller to handle, updates internal state via tap
   */
  login(credentials: LoginInput): Observable<AuthResponse> {
    this._loading.set(true);
    this._error.set(null);

    return this.medusaClient.login(credentials).pipe(
      tap({
        next: (response) => {
          this.updateUserFromResponse(response);
          this._loading.set(false);
        },
        error: (error) => {
          this._error.set(error.message || 'Login failed');
          this._loading.set(false);
          this._user.set(null);
        },
      })
    );
  }

  /**
   * Register a new B2B user
   * Returns Observable for caller to handle
   */
  registerB2B(data: B2BRegisterInput): Observable<any> {
    this._loading.set(true);
    this._error.set(null);

    return this.medusaClient.registerB2B(data).pipe(
      tap({
        next: (response) => {
          this.updateUserFromResponse({ customer: response.customer });
          this._loading.set(false);
        },
        error: (error) => {
          this._error.set(error.message || 'Registration failed');
          this._loading.set(false);
        },
      })
    );
  }

  /**
   * Logout current user
   */
  logout(): void {
    this.medusaClient.logout().subscribe({
      next: () => {
        this._user.set(null);
        this._error.set(null);
        localStorage.removeItem('rememberMe');
        this.router.navigate(['/auth/login']);
      },
      error: (error) => {
        console.error('Logout error:', error);
        // Even if logout fails, clear local state
        this._user.set(null);
        this.router.navigate(['/auth/login']);
      },
    });
  }

  /**
   * Clear error message
   */
  clearError(): void {
    this._error.set(null);
  }

  /**
   * Update user signal from API response
   * Transforms AuthResponse into B2BUser domain model
   */
  private updateUserFromResponse(response: AuthResponse): void {
    const customer = response.customer;
    const metadata = customer.metadata || {};
    
    const companyData = (metadata['company'] as Partial<B2BCompany>) || {};
    const role = (metadata['role'] as UserRole) || 'buyer';

    const b2bUser: B2BUser = {
      id: customer.id,
      email: customer.email,
      first_name: customer.first_name,
      last_name: customer.last_name,
      phone: customer.phone,
      has_account: customer.has_account,
      created_at: customer.created_at || new Date().toISOString(),
      updated_at: customer.updated_at || new Date().toISOString(),
      metadata: customer.metadata,
      groups: customer.groups,
      company: {
        id: companyData.id || '',
        name: companyData.name || '',
        tax_id: companyData.tax_id || '',
        status: companyData.status || 'pending',
        address: companyData.address,
        city: companyData.city,
        country: companyData.country,
        postal_code: companyData.postal_code,
        phone: companyData.phone,
        email: companyData.email,
        created_at: companyData.created_at,
        updated_at: companyData.updated_at,
        approved_at: companyData.approved_at,
        approved_by: companyData.approved_by,
      },
      role,
    };

    this._user.set(b2bUser);
  }
}
