import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { PurchaseService } from './purchase.service';
import { Purchase } from '../_entities/purchase.entity';

@ApiTags('purchase')
@Controller('purchase')
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
}
