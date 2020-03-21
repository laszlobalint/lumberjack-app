import { Body, Controller, Get, Param, Post, Put, Delete } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { DeleteResult } from 'typeorm';

import { ProductService } from './product.service';
import { Product } from './product.entity';
import { CreateProductDto, UpdateProductDto } from './product.dto';

@ApiTags('product')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async findAll(): Promise<Product[]> {
    return this.productService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Product> {
    return this.productService.findOne(+id);
  }

  @Post()
  async create(@Body('product') createProductDto: CreateProductDto): Promise<Product> {
    return this.productService.create(createProductDto);
  }

  @Put()
  async update(@Param('id') id: string, @Body('product') updateCustomerDto: UpdateProductDto): Promise<Product> {
    return this.productService.update(+id, updateCustomerDto);
  }

  @Delete()
  async remove(@Param('id') id: string): Promise<DeleteResult> {
    return this.productService.remove(id);
  }
}
