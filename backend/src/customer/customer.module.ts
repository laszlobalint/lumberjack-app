import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from '../entities/customer.entity';
import { User } from '../entities/user.entity';
import { UserModule } from '../user/user.module';
import { CustomerController } from './customer.controller';
import { CustomerService } from './customer.service';

@Module({
  imports: [TypeOrmModule.forFeature([Customer, User]), UserModule],
  controllers: [CustomerController],
  providers: [CustomerService],
  exports: [TypeOrmModule],
})
export class CustomerModule {}
