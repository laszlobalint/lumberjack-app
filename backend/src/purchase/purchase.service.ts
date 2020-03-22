import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Purchase } from './purchase.entity';

@Injectable()
export class PurchaseService {
  constructor(
    @InjectRepository(Purchase)
    private readonly purchaseRepository: Repository<Purchase>,
  ) {}

  async findAll(): Promise<Purchase[]> {
    return await this.purchaseRepository.find({ relations: ['customer', 'product', 'user'] });
  }

  async findOne(id: number): Promise<Purchase> {
    return await this.purchaseRepository.findOneOrFail({ where: { id }, relations: ['customer', 'product', 'user'] });
  }
}
