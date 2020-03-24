import { UserDto } from '../../../auth/models/user.model';

export class Product {
  id: number;
  name: string;
  price: number;
  amount: number;
  date: Date;
  user: UserDto;
}

export class CreateProductDto {
  createdBy: number;
  name: string;
  price: number;
  amount: number;
  description?: string;
}

export class UpdateProductDto {
  name: string;
  price: number;
  amount: number;
  description?: string;
}
