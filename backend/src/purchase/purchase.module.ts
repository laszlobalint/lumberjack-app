import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PurchaseService } from './purchase.service';
import { PurchaseController } from './purchase.controller';
import { Purchase } from './purchase.entity';
import { User } from '../user/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Purchase, User])],
  controllers: [PurchaseController],
  providers: [PurchaseService],
  exports: [TypeOrmModule],
})
export class PurchaseModule {}
