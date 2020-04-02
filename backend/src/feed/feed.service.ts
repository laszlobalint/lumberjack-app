import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { Purchase } from './../purchase/purchase.entity';
import { GetFeedDto } from './feed.dto';

@Injectable()
export class FeedService {
  constructor(
    @InjectRepository(Purchase)
    private readonly purchaseRepository: Repository<Purchase>,
  ) {}

  async getFeed(): Promise<GetFeedDto> {
    const currentDate = new Date();
    const tomorrowDateStart = this.getDateWithoutHours(currentDate, 1);
    const tomorrowDateEnd = this.getDateWithoutHours(currentDate, 2);

    const uncompletedPurchasesForTomorrow = await this.purchaseRepository.find({
      where: {
        completed: false,
        deliveryDate: Between(tomorrowDateStart, tomorrowDateEnd),
      },
      relations: ['customer'],
      order: {
        deliveryDate: 'ASC',
      },
    });

    return {
      uncompletedPurchasesForTomorrow,
    };
  }

  private getDateWithoutHours(date: Date, skipDays: number): Date {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate() + skipDays, 0, 0, 0, 0);
  }
}
