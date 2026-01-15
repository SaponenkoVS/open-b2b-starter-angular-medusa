export interface B2BCustomerMetadata {
  status: 'pending' | 'approved' | 'rejected';
  companyName: string;
  taxId: string;
  companyAddress: string;
  phone: string;
  approvedAt?: string;
  approvedBy?: string;
}

export interface B2BCustomer {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  hasAccount: boolean;
  metadata?: B2BCustomerMetadata;
  groups?: CustomerGroup[];
  createdAt: string;
  updatedAt: string;
}

export interface CustomerGroup {
  id: string;
  name: string;
  metadata?: Record<string, unknown>;
}

export interface RegistrationRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
  metadata: {
    companyName: string;
    taxId: string;
    companyAddress: string;
    status: 'pending';
  };
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  customer: B2BCustomer;
  token?: string;
}
