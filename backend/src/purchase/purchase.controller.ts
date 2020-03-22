import { Controller, Get, Param, Post, Delete, Body, Put, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { DeleteResult } from 'typeorm';

import { JwtAuthGuard } from '../auth/auth.jwt.guard';
import { PurchaseService } from './purchase.service';
import { Purchase } from './purchase.entity';
import { CreatePurchaseDto } from './purchase.dto';
import { UpdateProductDto } from 'src/product/product.dto';

@ApiTags('purchase')
@Controller('purchase')
@UseGuards(JwtAuthGuard)
export class PurchaseController {
  constructor(private readonly purchaseService: PurchaseService) {}

  @Get()
  findAll(): Promise<Purchase[]> {
    return this.purchaseService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Purchase> {
    return this.purchaseService.findOne(+id);
  }

  // @Post()
  // async create(@Body() createProductDto: CreatePurchaseDto): Promise<Purchase> {
  //   return this.purchaseService.create(createProductDto);
  // }

  // @Put(':id')
  // async update(@Param('id') id: string, @Body() updateCustomerDto: UpdateProductDto): Promise<Purchase> {
  //   return this.purchaseService.update(+id, updateCustomerDto);
  // }

  // @Delete(':id')
  // async remove(@Param('id') id: string): Promise<DeleteResult> {
  //   return this.purchaseService.remove(+id);
  // }
}
