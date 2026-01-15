import { Injectable, signal, computed } from '@angular/core';
import {
  MedusaClientService,
  CompanyService,
  Company,
} from '@b2b-storefront/medusa-api';

@Injectable({
  providedIn: 'root',
})
export class CompanyStateService {
  private medusaClient: MedusaClientService;
  private companyService: CompanyService;

  // Signals for state management
  private companiesSignal = signal<Company[]>([]);
  private loadingSignal = signal<boolean>(false);
  private errorSignal = signal<string | null>(null);
  private selectedCompanySignal = signal<Company | null>(null);

  // Computed values
  companies = computed(() => this.companiesSignal());
  loading = computed(() => this.loadingSignal());
  error = computed(() => this.errorSignal());
  selectedCompany = computed(() => this.selectedCompanySignal());
  activeCompanies = computed(() =>
    this.companiesSignal().filter((c) => c.is_active)
  );

  constructor() {
    this.medusaClient = new MedusaClientService();
    this.companyService = new CompanyService(this.medusaClient);
  }

  async loadCompanies(): Promise<void> {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    try {
      const response = await this.companyService.list();
      this.companiesSignal.set(response.companies);
    } catch (error: any) {
      this.errorSignal.set(error.message || 'Failed to load companies');
    } finally {
      this.loadingSignal.set(false);
    }
  }

  async loadCompany(id: string): Promise<void> {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    try {
      const response = await this.companyService.retrieve(id);
      this.selectedCompanySignal.set(response.company);
    } catch (error: any) {
      this.errorSignal.set(error.message || 'Failed to load company');
    } finally {
      this.loadingSignal.set(false);
    }
  }

  async createCompany(data: Partial<Company>): Promise<Company | null> {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    try {
      const response = await this.companyService.create(data);
      await this.loadCompanies(); // Reload list
      return response.company;
    } catch (error: any) {
      this.errorSignal.set(error.message || 'Failed to create company');
      return null;
    } finally {
      this.loadingSignal.set(false);
    }
  }

  async updateCompany(
    id: string,
    data: Partial<Company>
  ): Promise<Company | null> {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    try {
      const response = await this.companyService.update(id, data);
      await this.loadCompanies(); // Reload list
      return response.company;
    } catch (error: any) {
      this.errorSignal.set(error.message || 'Failed to update company');
      return null;
    } finally {
      this.loadingSignal.set(false);
    }
  }

  async deleteCompany(id: string): Promise<boolean> {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    try {
      await this.companyService.delete(id);
      await this.loadCompanies(); // Reload list
      return true;
    } catch (error: any) {
      this.errorSignal.set(error.message || 'Failed to delete company');
      return false;
    } finally {
      this.loadingSignal.set(false);
    }
  }

  selectCompany(company: Company | null): void {
    this.selectedCompanySignal.set(company);
  }
}
