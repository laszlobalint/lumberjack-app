import { IsBoolean, IsNotEmpty, IsNumber, ValidateIf, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

import { CreateCustomerDto } from './../customer/customer.dto';

export class CreatePurchaseDto {
  @Type(() => Number)
  @IsNumber()
  amount: number;

  @IsBoolean()
  reduceStock: boolean;

  @Type(() => Number)
  @IsNumber()
  price: number;

  @IsNumber()
  productId: number;

  @ValidateIf((o: CreatePurchaseDto) => !o.customer)
  @IsNotEmpty()
  customerId?: number;

  @ValidateIf((o: CreatePurchaseDto) => !o.customerId)
  @IsNotEmpty()
  @ValidateNested()
  customer?: CreateCustomerDto;

  description?: string;
}

export class UpdatePurchaseDto {
  @Type(() => Number)
  @IsNumber()
  amount: number;

  @Type(() => Number)
  @IsNumber()
  price: number;

  description?: string;

  @IsBoolean()
  completed: boolean;
}
