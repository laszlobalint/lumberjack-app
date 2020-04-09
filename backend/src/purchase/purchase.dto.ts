import { Type } from 'class-transformer';
import { IsBoolean, IsDate, IsNotEmpty, IsNumber, IsOptional, ValidateIf, ValidateNested } from 'class-validator';
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

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  deliveryDate?: Date;

  description?: string;
}

export class UpdatePurchaseDto {
  @Type(() => Number)
  @IsNumber()
  amount: number;

  @IsBoolean()
  reduceStock: boolean;

  @Type(() => Number)
  @IsNumber()
  price: number;

  description?: string;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  deliveryDate?: Date;

  @IsBoolean()
  completed: boolean;
}
