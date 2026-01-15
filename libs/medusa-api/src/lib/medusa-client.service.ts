import Medusa from "@medusajs/js-sdk";

export class MedusaClientService {
  private client: Medusa;
  private baseUrl: string;

  constructor(baseUrl: string = 'http://localhost:9000') {
    this.baseUrl = baseUrl;
    this.client = new Medusa({
      baseUrl: this.baseUrl,
      debug: process.env['NODE_ENV'] === 'development',
    });
  }

  getClient(): Medusa {
    return this.client;
  }

  getBaseUrl(): string {
    return this.baseUrl;
  }

  async authenticate(email: string, password: string): Promise<any> {
    try {
      const response = await this.client.auth.login('customer', 'emailpass', {
        email,
        password,
      });
      return response;
    } catch (error) {
      console.error('Authentication error:', error);
      throw error;
    }
  }

  async logout(): Promise<void> {
    try {
      await this.client.auth.logout();
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  }

  async getCurrentCustomer(): Promise<any> {
    try {
      const response = await this.client.store.customer.retrieve();
      return response;
    } catch (error) {
      console.error('Get current customer error:', error);
      throw error;
    }
  }
}
