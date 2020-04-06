import { IsNotEmpty } from 'class-validator';

export class CreateCustomerDto {
  @IsNotEmpty()
  address?: string;

  name?: string;
  phone?: string;
  companyName?: string;
  taxId?: string;
  nationalId?: string;
  checkingAccount?: string;
  description?: string;
}

export class UpdateCustomerDto extends CreateCustomerDto {}
