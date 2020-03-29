import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RateLimiterModule } from 'nestjs-rate-limiter';

import { AuthModule } from './auth/auth.module';
import { CustomerModule } from './customer/customer.module';
import { ProductModule } from './product/product.module';
import { PurchaseModule } from './purchase/purchase.module';
import { UserModule } from './user/user.module';
import { AuthController } from './auth/auth.controller';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(),
    RateLimiterModule.register({
      points: 200,
      duration: 60,
      keyPrefix: 'global',
    }),
    ,
    AuthModule,
    CustomerModule,
    ProductModule,
    PurchaseModule,
    UserModule,
  ],
  controllers: [AuthController],
})
export class AppModule {}
