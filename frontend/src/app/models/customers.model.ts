export interface CustomerDto {
  id: number;
  name?: string;
  address?: string;
  phone?: string;
  companyName?: string;
  taxId?: string;
  nationalId?: string;
  checkingAccount?: string;
  description?: string;
  createdDate: string;
}

export interface CreateCustomerDto {
  name?: string;
  address?: string;
  phone?: string;
  companyName?: string;
  taxId?: string;
  nationalId?: string;
  checkingAccount?: string;
  description?: string;
}

export type UpdateCustomerDto = CreateCustomerDto;
