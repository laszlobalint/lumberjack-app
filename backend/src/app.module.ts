import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from './auth/auth.module';
import { CustomerModule } from './customer/customer.module';
import { ProductModule } from './product/product.module';
import { PurchaseModule } from './purchase/purchase.module';
import { UserModule } from './user/user.module';
import { AuthController } from './auth/auth.controller';
import { Customer } from './customer/customer.entity';
import { Product } from './product/product.entity';
import { Purchase } from './purchase/purchase.entity';
import { User } from './user/user.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      name: process.env['DATABASE_CONFIG_NAME'],
      type: 'mariadb',
      host: process.env['DATABASE_HOST'],
      port: Number(process.env['DATABASE_PORT']),
      username: process.env['DATABASE_USERNAME'],
      password: process.env['DATABASE_PASSWORD'],
      database: process.env['DATABASE_NAME'],
      connectTimeout: Number(process.env['DATABASE_TIMEOUT']),
      charset: process.env['DATABASE_CHARSET'],
      synchronize: true,
      logging: false,
      insecureAuth: true,
      entities: [Customer, Product, Purchase, User],
    }),
    AuthModule,
    CustomerModule,
    ProductModule,
    PurchaseModule,
    UserModule,
  ],
  controllers: [AuthController],
})
export class AppModule {}
