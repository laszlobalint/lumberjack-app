import { Controller, Get, Param, Post, Delete, Body, Put, UseGuards } from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { DeleteResult } from 'typeorm';

import { JwtAuthGuard } from '../auth/auth.jwt.guard';
import { PurchaseService } from './purchase.service';
import { Purchase } from './purchase.entity';
import { CreatePurchaseDto, UpdatePurchaseDto } from './purchase.dto';

@ApiTags('purchase')
@Controller('purchase')
@UseGuards(JwtAuthGuard)
export class PurchaseController {
  constructor(private readonly purchaseService: PurchaseService) {}

  @Get()
  @ApiResponse({ status: 200, description: 'Returned all purchases.' })
  findAll(): Promise<Purchase[]> {
    return this.purchaseService.findAll();
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Returned all purchases.' })
  async findOne(@Param('id') id: string): Promise<Purchase> {
    return this.purchaseService.findOne(+id);
  }

  @Post()
  @ApiResponse({ status: 201, description: 'Created a purchase.' })
  async create(@Body() createProductDto: CreatePurchaseDto): Promise<Purchase> {
    return this.purchaseService.create(createProductDto);
  }

  @Put(':id')
  @ApiResponse({ status: 204, description: 'Modified a purchase.' })
  async update(@Param('id') id: string, @Body() updateCustomerDto: UpdatePurchaseDto): Promise<Purchase> {
    return this.purchaseService.update(+id, updateCustomerDto);
  }

  @Delete(':id')
  @ApiResponse({ status: 204, description: 'Deleted a purchase.' })
  async remove(@Param('id') id: string): Promise<DeleteResult> {
    return this.purchaseService.remove(+id);
  }
}
