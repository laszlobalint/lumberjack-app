import { UserDto } from '../auth/models/user.model';
import { CreateCustomerDto, CustomerDto } from '../pages/customers/customers.model';
import { ProductDto } from '../pages/products/product.model';

export interface PurchaseDto {
  id: number;
  userId: number;
  amount: number;
  price: number;
  description: string;
  completed: boolean;
  date: Date;
  product: ProductDto;
  customer: CustomerDto;
  user: UserDto;
}

export interface CreatePurchaseDto {
  userId: number;
  amount: number;
  price: number;
  productId: number;
  customerId?: number;
  customer?: CreateCustomerDto;
  description?: string;
  completed: boolean;
}
