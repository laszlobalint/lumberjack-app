import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { DeleteResult } from 'typeorm';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreatePurchaseDto, UpdatePurchaseDto } from './purchase.dto';
import { Purchase } from './purchase.entity';
import { PurchaseService } from './purchase.service';

@ApiTags('purchase')
@Controller('api/purchase')
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
  async create(@Req() req: any, @Body() createPurchaseDto: CreatePurchaseDto): Promise<Purchase> {
    return await this.purchaseService.create(createPurchaseDto, req.user.userId);
  }

  @Put(':id')
  @ApiResponse({ status: 204, description: 'Modified a purchase.' })
  async update(@Param('id') id: string, @Body() updatePurchaseDto: UpdatePurchaseDto): Promise<Purchase> {
    return this.purchaseService.update(+id, updatePurchaseDto);
  }

  @Delete(':id')
  @ApiResponse({ status: 204, description: 'Deleted a purchase.' })
  async remove(@Param('id') id: string): Promise<DeleteResult> {
    return this.purchaseService.remove(+id);
  }
}
