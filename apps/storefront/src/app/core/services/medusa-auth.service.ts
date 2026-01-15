import { Injectable, signal, computed } from '@angular/core';
import { Router } from '@angular/router';
import { MedusaClientService } from '@b2b-storefront/medusa-api';
import {
  B2BCustomer,
  RegistrationRequest,
  LoginRequest,
  B2BCustomerMetadata,
} from '../models/auth.model';

@Injectable({
  providedIn: 'root',
})
export class MedusaAuthService {
  private medusaClient: MedusaClientService;
  private currentCustomerSignal = signal<B2BCustomer | null>(null);
  private isAuthenticatedSignal = signal<boolean>(false);
  private loadingSignal = signal<boolean>(false);
  private errorSignal = signal<string | null>(null);

  // Computed values
  currentCustomer = computed(() => this.currentCustomerSignal());
  isAuthenticated = computed(() => this.isAuthenticatedSignal());
  loading = computed(() => this.loadingSignal());
  error = computed(() => this.errorSignal());
  
  // B2B specific computed values
  customerStatus = computed(() => {
    const customer = this.currentCustomerSignal();
    return (customer?.metadata as B2BCustomerMetadata)?.status || 'pending';
  });
  
  isApproved = computed(() => this.customerStatus() === 'approved');
  isPending = computed(() => this.customerStatus() === 'pending');
  isRejected = computed(() => this.customerStatus() === 'rejected');
  
  companyName = computed(() => {
    const customer = this.currentCustomerSignal();
    return (customer?.metadata as B2BCustomerMetadata)?.companyName || '';
  });

  customerGroup = computed(() => {
    const customer = this.currentCustomerSignal();
    return customer?.groups?.[0] || null;
  });

  constructor(private router: Router) {
    this.medusaClient = new MedusaClientService();
    this.checkAuthState();
  }

  private async checkAuthState(): Promise<void> {
    try {
      const customer = await this.medusaClient.getCurrentCustomer();
      if (customer) {
        this.currentCustomerSignal.set(customer.customer as B2BCustomer);
        this.isAuthenticatedSignal.set(true);
      }
    } catch (error) {
      this.isAuthenticatedSignal.set(false);
    }
  }

  async register(request: RegistrationRequest): Promise<{ success: boolean; message?: string }> {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);

    try {
      const response = await fetch(`${this.medusaClient.getBaseUrl()}/store/customers`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          email: request.email,
          password: request.password,
          first_name: request.firstName,
          last_name: request.lastName,
          phone: request.phone,
          metadata: request.metadata,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Registration failed');
      }

      const data = await response.json();
      this.currentCustomerSignal.set(data.customer as B2BCustomer);
      this.isAuthenticatedSignal.set(true);

      return { success: true };
    } catch (error: any) {
      this.errorSignal.set(error.message || 'Registration failed');
      return { success: false, message: error.message };
    } finally {
      this.loadingSignal.set(false);
    }
  }

  async login(request: LoginRequest, rememberMe: boolean = false): Promise<{ success: boolean; message?: string }> {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);

    try {
      const response = await this.medusaClient.authenticate(
        request.email,
        request.password
      );

      if (response) {
        // Fetch full customer details
        const customerResponse = await this.medusaClient.getCurrentCustomer();
        this.currentCustomerSignal.set(customerResponse.customer as B2BCustomer);
        this.isAuthenticatedSignal.set(true);

        if (rememberMe) {
          localStorage.setItem('rememberMe', 'true');
        }

        return { success: true };
      }

      throw new Error('Login failed');
    } catch (error: any) {
      this.errorSignal.set(error.message || 'Login failed');
      return { success: false, message: error.message };
    } finally {
      this.loadingSignal.set(false);
    }
  }

  async logout(): Promise<void> {
    try {
      await this.medusaClient.logout();
      this.currentCustomerSignal.set(null);
      this.isAuthenticatedSignal.set(false);
      localStorage.removeItem('rememberMe');
      this.router.navigate(['/auth/login']);
    } catch (error) {
      console.error('Logout error:', error);
    }
  }

  clearError(): void {
    this.errorSignal.set(null);
  }
}
