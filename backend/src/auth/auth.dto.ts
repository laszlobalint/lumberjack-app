import { ApiProperty } from '@nestjs/swagger';
import { Customer } from '../customer/customer.entity';
import { Product } from '../product/product.entity';
import { Purchase } from '../purchase/purchase.entity';
import { UserRoleType } from '../user/user.entity';

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
  role: UserRoleType;
  products: Product[];
  purchases: Purchase[];
  customers: Customer[];
}

export class LoginResponseDto {
  access_token: string;
  user: UserDto;
}
