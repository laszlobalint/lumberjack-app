import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerModule } from '../customer/customer.module';
import { UserModule } from '../user/user.module';
import { ProductModule } from '../product/product.module';
import { PurchaseController } from './purchase.controller';
import { PurchaseService } from './purchase.service';
import { User } from '../user/user.entity';
import { Purchase } from './purchase.entity';
import { Product } from '../product/product.entity';
import { Customer } from '../customer/customer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Customer, User, Purchase, Product]), CustomerModule, UserModule, ProductModule],
  controllers: [PurchaseController],
  providers: [PurchaseService],
  exports: [TypeOrmModule],
})
export class PurchaseModule {}
