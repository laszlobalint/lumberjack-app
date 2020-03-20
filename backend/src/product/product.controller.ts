import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Product } from '../_entities/product.entity';
import { CreateProductDto } from './create-product.dto';
import { ProductService } from './product.service';

@ApiTags('product')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  findAll(): Promise<Product[]> {
    return this.productService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Product> {
    return this.productService.findOne(+id);
  }

  @Post()
  async create(
    @Body('product') createProductDto: CreateProductDto,
  ): Promise<Product> {
    return this.productService.create(createProductDto);
  }
}
