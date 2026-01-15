import { B2BCompany } from './domain/b2b-user.model';

/**
 * Input DTO: Login Request
 */
export interface LoginInput {
  email: string;
  password: string;
}

/**
 * Input DTO: B2B Registration Request
 */
export interface B2BRegisterInput {
  // Personal Information
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  phone: string;
  
  // Company Information
  company: {
    name: string;
    tax_id: string;
    address: string;
  };
}

/**
 * Output DTO: Authentication Response
 */
export interface AuthResponse {
  customer: {
    id: string;
    email: string;
    first_name: string;
    last_name: string;
    phone?: string;
    has_account: boolean;
    metadata?: {
      company?: Partial<B2BCompany>;
      role?: string;
    };
    groups?: Array<{ id: string; name: string }>;
  };
}

/**
 * Output DTO: Registration Response
 */
export interface RegistrationResponse {
  customer: AuthResponse['customer'];
  requiresApproval: boolean;
}
