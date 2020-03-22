import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { CustomerModule } from './customer/customer.module';
import { ProductModule } from './product/product.module';
import { PurchaseModule } from './purchase/purchase.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [ConfigModule.forRoot(), TypeOrmModule.forRoot(), AuthModule, CustomerModule, ProductModule, PurchaseModule, UserModule],
  controllers: [AuthController],
})
export class AppModule {}
