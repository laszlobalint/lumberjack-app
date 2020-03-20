import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Customer } from '../_entities/customer.entity';
import { CreateCustomerDto, UpdateCustomerDto } from './customer.dto';
import { CustomerService } from './customer.service';

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
  async create(
    @Body('customer') createCostumerDto: CreateCustomerDto,
  ): Promise<Customer> {
    return this.customerService.create(createCostumerDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body('customer') updateCustomerDto: UpdateCustomerDto,
  ) {
    return this.customerService.update(id, updateCustomerDto);
  }
}
