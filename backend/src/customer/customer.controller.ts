import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from './../auth/guards/jwt-auth.guard';
import { CreateCustomerDto, UpdateCustomerDto } from './customer.dto';
import { Customer } from './customer.entity';
import { CustomerService } from './customer.service';

@ApiTags('customer')
@Controller('api/customer')
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
  async create(@Body() createCustomerDto: CreateCustomerDto, @Req() req: any): Promise<Customer> {
    return this.customerService.create(createCustomerDto, +req.user.userId);
  }

  @Put(':id')
  @ApiResponse({ status: 204, description: 'Updated a customer.' })
  async update(@Param('id') id: string, @Body() updateCustomerDto: UpdateCustomerDto): Promise<Customer> {
    return this.customerService.update(+id, updateCustomerDto);
  }

  @Delete(':id')
  @ApiResponse({ status: 204, description: 'Deleted a customer.' })
  async remove(@Param('id') id: string): Promise<number> {
    return this.customerService.remove(+id);
  }
}
