import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../user/user.module';
import { Customer } from '../_entities/customer.entity';
import { User } from '../_entities/user.entity';
import { CustomerController } from './customer.controller';
import { CustomerService } from './customer.service';

@Module({
  imports: [TypeOrmModule.forFeature([Customer, User]), UserModule],
  controllers: [CustomerController],
  providers: [CustomerService],
  exports: [TypeOrmModule],
})
export class CustomerModule {}
