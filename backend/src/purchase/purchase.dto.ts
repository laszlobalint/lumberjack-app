import { CreateCustomerDto } from './../customer/customer.dto';
export class CreatePurchaseDto {
  amount: number;
  price: number;
  productId: number;
  customerId?: number;
  customer?: CreateCustomerDto;
  description?: string;
  completed: boolean;
}

export class UpdatePurchaseDto {
  amount: number;
  price: number;
  description?: string;
  completed: boolean;
}
