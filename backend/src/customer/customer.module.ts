import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../user/user.module';
import { CustomerController } from './customer.controller';
import { CustomerService } from './customer.service';
import { Customer } from './customer.entity';
import { User } from '../user/user.entity';
import { Purchase } from '../purchase/purchase.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Customer, User, Purchase]), UserModule],
  controllers: [CustomerController],
  providers: [CustomerService],
  exports: [TypeOrmModule],
})
export class CustomerModule {}
