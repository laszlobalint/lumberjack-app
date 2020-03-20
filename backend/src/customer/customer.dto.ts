import { ApiProperty } from '@nestjs/swagger';

export class CreateCustomerDto {
  @ApiProperty({
    type: 'string',
    description: 'User id',
  })
  createdBy: number;

  @ApiProperty({
    type: 'string',
  })
  name?: string;

  @ApiProperty({
    type: 'string',
  })
  address?: string;

  @ApiProperty({
    type: 'string',
  })
  phone?: string;

  @ApiProperty({
    type: 'string',
  })
  companyName?: string;

  @ApiProperty({
    type: 'string',
  })
  taxId?: string;

  @ApiProperty({
    type: 'string',
  })
  nationalId?: string;

  @ApiProperty({
    type: 'string',
  })
  checkingAccount?: string;

  @ApiProperty({
    type: 'string',
  })
  description?: string;
}

export class UpdateCustomerDto {
  @ApiProperty({
    type: 'string',
  })
  name?: string;

  @ApiProperty({
    type: 'string',
  })
  address?: string;

  @ApiProperty({
    type: 'string',
  })
  phone?: string;

  @ApiProperty({
    type: 'string',
  })
  companyName?: string;

  @ApiProperty({
    type: 'string',
  })
  taxId?: string;

  @ApiProperty({
    type: 'string',
  })
  nationalId?: string;

  @ApiProperty({
    type: 'string',
  })
  checkingAccount?: string;

  @ApiProperty({
    type: 'string',
  })
  description?: string;
}
