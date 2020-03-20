import { ApiProperty } from '@nestjs/swagger';
import { Customer } from '../customer/customer.entity';
import { Product } from '../product/product.entity';
import { Purchase } from '../purchase/purchase.entity';

export class LoginDto {
  @ApiProperty({ type: 'string' })
  username: string;

  @ApiProperty({ type: 'string' })
  password: string;
}

export class LoggedInUserDto {
  @ApiProperty({ type: 'number' })
  id: number;

  @ApiProperty({ type: 'string' })
  username: string;

  @ApiProperty({ type: 'string' })
  name: string;

  @ApiProperty({ type: 'object' })
  products: Product[];

  @ApiProperty({ type: 'object' })
  purchases: Purchase[];

  @ApiProperty({ type: 'object' })
  customers: Customer[];
}

export class LoginResponseDto extends LoggedInUserDto {
  access_token: string;
}
