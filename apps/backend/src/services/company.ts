import { TransactionBaseService } from "@medusajs/medusa";
import { Company } from "../models/company";
import { Repository } from "typeorm";

class CompanyService extends TransactionBaseService {
  protected companyRepository_: Repository<Company>;

  constructor(container: any) {
    super(container);
    this.companyRepository_ = container.companyRepository;
  }

  async list(): Promise<Company[]> {
    const companyRepo = this.activeManager_.withRepository(
      this.companyRepository_
    );
    return companyRepo.find();
  }

  async retrieve(id: string): Promise<Company> {
    const companyRepo = this.activeManager_.withRepository(
      this.companyRepository_
    );
    const company = await companyRepo.findOne({ where: { id } });
    
    if (!company) {
      throw new Error(`Company with id: ${id} was not found`);
    }

    return company;
  }

  async create(data: Partial<Company>): Promise<Company> {
    return this.atomicPhase_(async (manager) => {
      const companyRepo = manager.withRepository(this.companyRepository_);
      const company = companyRepo.create(data);
      return await companyRepo.save(company);
    });
  }

  async update(id: string, data: Partial<Company>): Promise<Company> {
    return this.atomicPhase_(async (manager) => {
      const companyRepo = manager.withRepository(this.companyRepository_);
      const company = await this.retrieve(id);
      
      Object.assign(company, data);
      return await companyRepo.save(company);
    });
  }

  async delete(id: string): Promise<void> {
    return this.atomicPhase_(async (manager) => {
      const companyRepo = manager.withRepository(this.companyRepository_);
      const company = await this.retrieve(id);
      await companyRepo.remove(company);
    });
  }
}

export default CompanyService;
