/**
 * Domain Model: B2B Company
 * Pure TypeScript interface representing a B2B company entity
 */
export interface B2BCompany {
  id: string;
  name: string;
  tax_id: string;
  address?: string;
  city?: string;
  country?: string;
  postal_code?: string;
  phone?: string;
  email?: string;
  status: 'pending' | 'approved' | 'rejected';
  created_at?: string;
  updated_at?: string;
  approved_at?: string;
  approved_by?: string;
}

/**
 * Domain Model: Customer from Medusa
 * Base customer interface from MedusaJS
 */
export interface Customer {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  phone?: string;
  has_account: boolean;
  created_at: string;
  updated_at: string;
  metadata?: Record<string, unknown>;
}

/**
 * Domain Model: Customer Group
 * Represents a B2B customer group for pricing and permissions
 */
export interface CustomerGroup {
  id: string;
  name: string;
  metadata?: Record<string, unknown>;
  created_at?: string;
  updated_at?: string;
}

/**
 * Domain Model: B2B User
 * Extends Medusa Customer with B2B-specific fields
 */
export interface B2BUser extends Customer {
  company: B2BCompany;
  role: 'admin' | 'buyer';
  groups?: CustomerGroup[];
}

/**
 * Value Object: User Role
 */
export type UserRole = 'admin' | 'buyer';

/**
 * Value Object: Company Status
 */
export type CompanyStatus = 'pending' | 'approved' | 'rejected';
