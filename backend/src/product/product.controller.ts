import { Body, Controller, Get, Param, Post, Put, Delete, UseGuards } from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { DeleteResult } from 'typeorm';

import { JwtAuthGuard } from '../auth/auth.jwt.guard';
import { ProductService } from './product.service';
import { Product } from './product.entity';
import { CreateProductDto, UpdateProductDto } from './product.dto';

@ApiTags('product')
@Controller('product')
@UseGuards(JwtAuthGuard)
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  @ApiResponse({ status: 200, description: 'Returned all products.' })
  async findAll(): Promise<Product[]> {
    return this.productService.findAll();
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Returned single product.' })
  async findOne(@Param('id') id: string): Promise<Product> {
    return this.productService.findOne(+id);
  }

  @Post()
  @ApiResponse({ status: 201, description: 'Created a product.' })
  async create(@Body() createProductDto: CreateProductDto): Promise<Product> {
    return this.productService.create(createProductDto);
  }

  @Put(':id')
  @ApiResponse({ status: 204, description: 'Modified a product.' })
  async update(@Param('id') id: string, @Body() updateCustomerDto: UpdateProductDto): Promise<Product> {
    return this.productService.update(+id, updateCustomerDto);
  }

  @Delete(':id')
  @ApiResponse({ status: 204, description: 'Deleted a product.' })
  async remove(@Param('id') id: string): Promise<DeleteResult> {
    return this.productService.remove(+id);
  }
}
