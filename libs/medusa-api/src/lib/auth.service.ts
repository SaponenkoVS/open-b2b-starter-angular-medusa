import { MedusaClientService } from './medusa-client.service';

export class AuthService {
  constructor(private medusaClient: MedusaClientService) {}

  async login(email: string, password: string): Promise<any> {
    return this.medusaClient.authenticate(email, password);
  }

  async logout(): Promise<void> {
    return this.medusaClient.logout();
  }

  async getCurrentUser(): Promise<any> {
    return this.medusaClient.getCurrentCustomer();
  }

  isAuthenticated(): boolean {
    // Check if there's a session cookie
    return document.cookie.includes('connect.sid');
  }
}
