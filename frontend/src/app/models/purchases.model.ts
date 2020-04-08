import { UserDto } from '../auth/models/user.model';
import { CreateCustomerDto, CustomerDto } from './customers.model';
import { ProductDto } from './products.model';

export interface PurchaseDto {
  id: number;
  userId: number;
  amount: number;
  price: number;
  description: string;
  completed: boolean;
  reduceStock: boolean;
  deliveryDate: string;
  createdDate: string;
  product: ProductDto;
  customer: CustomerDto;
  user: UserDto;
}

export interface CreatePurchaseDto {
  amount: number;
  reduceStock: boolean;
  price: number;
  productId: number;
  customerId?: number;
  customer?: CreateCustomerDto;
  description?: string;
  deliveryDate?: string;
}

export interface UpdatePurchaseDto {
  amount?: number;
  reduceStock?: boolean;
  price?: number;
  completed?: boolean;
  description?: string;
  deliveryDate?: string;
}
