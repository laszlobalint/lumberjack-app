import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RateLimiterInterceptor, RateLimiterModule } from 'nestjs-rate-limiter';
import * as fs from 'fs';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { CustomerModule } from './customer/customer.module';
import { FeedModule } from './feed/feed.module';
import { FrontendMiddleware } from './frontend.middleware';
import { ProductModule } from './product/product.module';
import { PurchaseModule } from './purchase/purchase.module';
import { UserModule } from './user/user.module';

const defaultEnvFilePath = fs.existsSync('.env') && '.env';
const defaultMode = 'development';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: defaultEnvFilePath || `.env.${process.env.NODE_ENV || defaultMode}` }),
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
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    if (process.env.NODE_ENV.trim() !== 'dev') {
      consumer.apply(FrontendMiddleware).forRoutes({
        path: '/**',
        method: RequestMethod.ALL,
      });
    }
  }
}
