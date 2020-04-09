export interface CustomerDto {
  id: number;
  address: string;
  name?: string;
  phone?: string;
  companyName?: string;
  taxId?: string;
  nationalId?: string;
  checkingAccount?: string;
  description?: string;
  createdDate: string;
}

export interface CreateCustomerDto {
  address: string;
  name?: string;
  phone?: string;
  companyName?: string;
  taxId?: string;
  nationalId?: string;
  checkingAccount?: string;
  description?: string;
}

export type UpdateCustomerDto = CreateCustomerDto;
