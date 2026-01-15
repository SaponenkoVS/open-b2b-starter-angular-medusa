import { Entity, Column, JoinColumn, ManyToOne } from "typeorm";
import { Customer as MedusaCustomer } from "@medusajs/medusa";
import { Company } from "./company";

@Entity()
export class Customer extends MedusaCustomer {
  @Column({ type: "varchar", nullable: true })
  company_id: string | null;

  @ManyToOne(() => Company)
  @JoinColumn({ name: "company_id" })
  company?: Company;
}
