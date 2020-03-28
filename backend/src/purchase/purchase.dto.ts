import { CreateCustomerDto } from './../customer/customer.dto';

export class CreatePurchaseDto {
  amount: number;
  reduceStock: boolean;
  price: number;
  productId: number;
  customerId?: number;
  customer?: CreateCustomerDto;
  description?: string;
}

export class UpdatePurchaseDto {
  amount: number;
  price: number;
  description?: string;
  completed: boolean;
}
