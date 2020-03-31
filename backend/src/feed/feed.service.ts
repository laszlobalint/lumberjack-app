import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Purchase } from './../purchase/purchase.entity';

@Injectable()
export class FeedService {
  constructor(
    @InjectRepository(Purchase)
    private readonly purchaseRepository: Repository<Purchase>,
  ) {}

  // getNextUncompletedPurchase(): Promise<Purchase> {
  //   this.purchaseRepository.createQueryBuilder("purchase").addSelect("min(deliveryDate)").addSelect("purchase.completed = 0")
  // }
}
