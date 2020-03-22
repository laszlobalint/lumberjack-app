import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserController } from './user.controller';
import { UserService } from './user.service';
import { Customer } from 'src/customer/customer.entity';
import { User } from './user.entity';
import { Product } from 'src/product/product.entity';
import { Purchase } from 'src/purchase/purchase.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Customer, Product, Purchase, User])],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
