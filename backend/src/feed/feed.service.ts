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

    const firstUncompletedPurchaseForTomorrow = await this.purchaseRepository.findOne({
      where: {
        completed: false,
        deliveryDate: Between(tomorrowDateStart, tomorrowDateEnd),
      },
    });

    return {
      nextUncompletedForTomorrow: firstUncompletedPurchaseForTomorrow,
    };
  }

  private getDateWithoutHours(date: Date, skipDays: number) {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate() + skipDays, 0, 0, 0, 0);
  }
}
