import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Purchase } from './../purchase/purchase.entity';
import { FeedService } from './feed.service';
import { FeedController } from './feed.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Purchase])],
  providers: [FeedService],
  controllers: [FeedController],
})
export class FeedModule {}
