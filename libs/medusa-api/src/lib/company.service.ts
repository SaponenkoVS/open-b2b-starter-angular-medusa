import { MedusaClientService } from './medusa-client.service';
import { Company } from './types';

export class CompanyService {
  constructor(private medusaClient: MedusaClientService) {}

  async list(): Promise<{ companies: Company[] }> {
    const baseUrl = this.medusaClient.getBaseUrl();
    try {
      const response = await fetch(`${baseUrl}/admin/companies`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return await response.json();
    } catch (error) {
      console.error('List companies error:', error);
      throw error;
    }
  }

  async retrieve(id: string): Promise<{ company: Company }> {
    const baseUrl = this.medusaClient.getBaseUrl();
    try {
      const response = await fetch(
        `${baseUrl}/admin/companies/${id}`,
        {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      return await response.json();
    } catch (error) {
      console.error('Retrieve company error:', error);
      throw error;
    }
  }

  async create(data: Partial<Company>): Promise<{ company: Company }> {
    const baseUrl = this.medusaClient.getBaseUrl();
    try {
      const response = await fetch(`${baseUrl}/admin/companies`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      return await response.json();
    } catch (error) {
      console.error('Create company error:', error);
      throw error;
    }
  }

  async update(
    id: string,
    data: Partial<Company>
  ): Promise<{ company: Company }> {
    const baseUrl = this.medusaClient.getBaseUrl();
    try {
      const response = await fetch(
        `${baseUrl}/admin/companies/${id}`,
        {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        }
      );
      return await response.json();
    } catch (error) {
      console.error('Update company error:', error);
      throw error;
    }
  }

  async delete(id: string): Promise<void> {
    const baseUrl = this.medusaClient.getBaseUrl();
    try {
      await fetch(`${baseUrl}/admin/companies/${id}`, {
        method: 'DELETE',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } catch (error) {
      console.error('Delete company error:', error);
      throw error;
    }
  }
}
