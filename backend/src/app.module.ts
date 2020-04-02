import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RateLimiterModule, RateLimiterInterceptor } from 'nestjs-rate-limiter';
import { AuthModule } from './auth/auth.module';
import { CustomerModule } from './customer/customer.module';
import { ProductModule } from './product/product.module';
import { PurchaseModule } from './purchase/purchase.module';
import { UserModule } from './user/user.module';
import { AuthController } from './auth/auth.controller';
import { FeedModule } from './feed/feed.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(),
    RateLimiterModule.register({
      points: 200,
      duration: 60,
      keyPrefix: 'global',
      type: 'Memory',
    }),
    AuthModule,
    CustomerModule,
    ProductModule,
    PurchaseModule,
    UserModule,
    FeedModule,
  ],
  controllers: [AuthController],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: RateLimiterInterceptor,
    },
  ],
})
export class AppModule {}
