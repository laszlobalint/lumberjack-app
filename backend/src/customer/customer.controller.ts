import { Body, Controller, Get, Param, Post, Put, UseGuards, Delete } from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { DeleteResult } from 'typeorm';

import { JwtAuthGuard } from '../auth/auth.jwt.guard';
import { CustomerService } from './customer.service';
import { Customer } from './customer.entity';
import { CreateCustomerDto, UpdateCustomerDto } from './customer.dto';

@ApiTags('customer')
@Controller('customer')
@UseGuards(JwtAuthGuard)
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Get()
  @ApiResponse({ status: 200, description: 'Returned all customers.' })
  async findAll(): Promise<Customer[]> {
    return this.customerService.findAll();
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Returned single customer.' })
  async findOne(@Param('id') id: string): Promise<Customer> {
    return this.customerService.findOne(+id);
  }

  @Post()
  @ApiResponse({ status: 201, description: 'Created a customer.' })
  async create(@Body() createCustomerDto: CreateCustomerDto): Promise<Customer> {
    return this.customerService.create(createCustomerDto);
  }

  @Put(':id')
  @ApiResponse({ status: 204, description: 'Updated a customer.' })
  async update(@Param('id') id: string, @Body() updateCustomerDto: UpdateCustomerDto): Promise<Customer> {
    return this.customerService.update(+id, updateCustomerDto);
  }

  @Delete(':id')
  @ApiResponse({ status: 204, description: 'Deleted a customer.' })
  async remove(@Param('id') id: string): Promise<DeleteResult> {
    return this.customerService.remove(+id);
  }
}
