import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from './../auth/guards/jwt-auth.guard';
import { CreateProductDto, UpdateProductDto } from './product.dto';
import { Product } from './product.entity';
import { ProductService } from './product.service';

@ApiTags('product')
@Controller('api/product')
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
  async create(@Body() createProductDto: CreateProductDto, @Req() req: any): Promise<Product> {
    return this.productService.create(createProductDto, +req.user.userId);
  }

  @Put(':id')
  @ApiResponse({ status: 204, description: 'Modified a product.' })
  async update(@Param('id') id: string, @Body() updateCustomerDto: UpdateProductDto): Promise<Product> {
    return this.productService.update(+id, updateCustomerDto);
  }

  @Delete(':id')
  @ApiResponse({ status: 204, description: 'Deleted a product.' })
  async remove(@Param('id') id: string): Promise<number> {
    return this.productService.remove(+id);
  }
}
