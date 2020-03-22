import { ApiProperty } from '@nestjs/swagger';
import { Customer } from '../customer/customer.entity';
import { Product } from '../product/product.entity';
import { Purchase } from '../purchase/purchase.entity';

export class LoginDto {
  @ApiProperty({ type: 'string' })
  email: string;

  @ApiProperty({ type: 'string' })
  password: string;
}

export class UserDto {
  id: number;
  email: string;
  name: string;
  products: Product[];
  purchases: Purchase[];
  customers: Customer[];
}

export class LoginResponseDto {
  access_token: string;
  user: UserDto;
}
