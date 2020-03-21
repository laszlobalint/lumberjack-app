import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { CustomerService } from './customer.service';
import { Customer } from './customer.entity';
import { CreateCustomerDto, UpdateCustomerDto } from './customer.dto';

@ApiTags('customer')
@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Get()
  async findAll(): Promise<Customer[]> {
    return this.customerService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Customer> {
    return this.customerService.findOne(+id);
  }

  @Post()
  async create(@Body() createCostumerDto: CreateCustomerDto): Promise<Customer> {
    return this.customerService.create(createCostumerDto);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateCustomerDto: UpdateCustomerDto): Promise<Customer> {
    return this.customerService.update(+id, updateCustomerDto);
  }
}
