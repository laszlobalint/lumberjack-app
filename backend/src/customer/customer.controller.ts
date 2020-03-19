import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Customer } from '../_entities/customer.entity';
import { CreateCustomerDto } from './create-customer.dto';
import { CustomerService } from './customer.service';

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
  async create(
    @Body('customer') createCostumerDto: CreateCustomerDto,
  ): Promise<Customer> {
    return this.customerService.create(createCostumerDto);
  }
}
