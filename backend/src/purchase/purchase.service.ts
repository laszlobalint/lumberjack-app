import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Purchase } from '../_entities/purchase.entity';
import { User } from '../_entities/user.entity';

@Injectable()
export class PurchaseService {
  constructor(
    @InjectRepository(Purchase)
    private readonly purchaseRepository: Repository<Purchase>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<Purchase[]> {
    return await this.purchaseRepository.find();
  }

  async findOne(id: number): Promise<Purchase> {
    return await this.purchaseRepository.findOne(id);
  }
}
