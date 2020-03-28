import { Body, Controller, Delete, Get, Param, Post, Put, Req, UnprocessableEntityException, UseGuards } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { DeleteResult } from 'typeorm';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { PurchaseService } from './purchase.service';
import { CreatePurchaseDto, UpdatePurchaseDto } from './purchase.dto';
import { Purchase } from './purchase.entity';

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
  async create(@Req() req: any, @Body() createProductDto: CreatePurchaseDto): Promise<Purchase> {
    if (!createProductDto.customerId && !createProductDto.customer) {
      throw new UnprocessableEntityException('Field customerId or customer must exist.');
    }

    const purchase = await this.purchaseService.create(createProductDto, req.user.userId);
    if (!purchase) {
      throw new UnprocessableEntityException();
    } else {
      return purchase;
    }
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
