import { UserDto } from '../auth/models/user.model';

export class ProductDto {
  id: number;
  name: string;
  price: number;
  amount: number;
  createdDate: Date;
  user: UserDto;
}

export class CreateProductDto {
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
