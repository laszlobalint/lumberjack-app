export class CreateCustomerDto {
  createdBy: number;
  name?: string;
  address?: string;
  phone?: string;
  companyName?: string;
  taxId?: string;
  nationalId?: string;
  checkingAccount?: string;
  description?: string;
}

export class UpdateCustomerDto {
  name?: string;
  address?: string;
  phone?: string;
  companyName?: string;
  taxId?: string;
  nationalId?: string;
  checkingAccount?: string;
  description?: string;
}
