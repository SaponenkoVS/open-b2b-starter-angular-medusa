// Company entity interface
export interface Company {
  id: string;
  name: string;
  tax_id: string | null;
  address: string | null;
  city: string | null;
  country: string | null;
  postal_code: string | null;
  phone: string | null;
  email: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

// Customer entity interface extended with company
export interface Customer {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  company_id: string | null;
  company?: Company;
  created_at: string;
  updated_at: string;
}

// Price list interface for B2B pricing
export interface PriceList {
  id: string;
  name: string;
  description: string;
  type: 'sale' | 'override';
  status: 'active' | 'draft';
  starts_at: string | null;
  ends_at: string | null;
  customer_groups: { id: string }[];
}

// API Response types
export interface ApiResponse<T> {
  data: T;
  error?: string;
}

export interface ListResponse<T> {
  items: T[];
  count: number;
  offset: number;
  limit: number;
}
