import { Injectable } from '@angular/core';
import Medusa from '@medusajs/js-sdk';
import { Observable, from, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AuthResponse, LoginInput, B2BRegisterInput, RegistrationResponse } from '../models/auth-dto.model';

/**
 * Infrastructure Layer: Medusa Client Service
 * Low-level wrapper around @medusajs/js-sdk
 * Provides typed methods for interacting with Medusa API
 */
@Injectable({
  providedIn: 'root',
})
export class MedusaClientService {
  private readonly client: Medusa;
  private readonly baseUrl: string;

  constructor() {
    this.baseUrl = 'http://localhost:9000';
    this.client = new Medusa({
      baseUrl: this.baseUrl,
      debug: false,
    });
  }

  /**
   * Authenticate a customer
   * @param credentials Login credentials
   * @returns Observable of authentication response
   */
  login(credentials: LoginInput): Observable<AuthResponse> {
    return from(
      this.client.auth.login('customer', 'emailpass', {
        email: credentials.email,
        password: credentials.password,
      })
    ).pipe(
      map(() => this.getCurrentCustomer()),
      catchError((error) => {
        console.error('Login error:', error);
        return throwError(() => new Error(error.message || 'Login failed'));
      })
    );
  }

  /**
   * Register a new B2B customer
   * @param data Registration data
   * @returns Observable of registration response
   */
  registerB2B(data: B2BRegisterInput): Observable<RegistrationResponse> {
    return from(
      fetch(`${this.baseUrl}/store/customers`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          email: data.email,
          password: data.password,
          first_name: data.first_name,
          last_name: data.last_name,
          phone: data.phone,
          metadata: {
            company: {
              name: data.company.name,
              tax_id: data.company.tax_id,
              address: data.company.address,
              status: 'pending',
            },
            role: 'admin', // First user from company becomes admin
          },
        }),
      })
    ).pipe(
      map(async (response) => {
        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.message || 'Registration failed');
        }
        const result = await response.json();
        return {
          customer: result.customer,
          requiresApproval: true,
        };
      }),
      catchError((error) => {
        console.error('Registration error:', error);
        return throwError(() => new Error(error.message || 'Registration failed'));
      })
    );
  }

  /**
   * Get current authenticated customer
   * @returns Promise of customer data
   */
  private async getCurrentCustomer(): Promise<AuthResponse> {
    try {
      const response = await this.client.store.customer.retrieve();
      return { customer: response.customer as AuthResponse['customer'] };
    } catch (error) {
      console.error('Get customer error:', error);
      throw new Error('Failed to get customer details');
    }
  }

  /**
   * Get current customer as Observable
   */
  getCurrentCustomer$(): Observable<AuthResponse> {
    return from(this.getCurrentCustomer());
  }

  /**
   * Logout current customer
   * @returns Observable of void
   */
  logout(): Observable<void> {
    return from(this.client.auth.logout()).pipe(
      catchError((error) => {
        console.error('Logout error:', error);
        return throwError(() => new Error('Logout failed'));
      })
    );
  }

  /**
   * Get base URL for direct API calls
   */
  getBaseUrl(): string {
    return this.baseUrl;
  }
}
