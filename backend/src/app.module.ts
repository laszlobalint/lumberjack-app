import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerModule } from './customer/customer.module';
import { ProductModule } from './product/product.module';
import { UserModule } from './user/user.module';
import { Customer } from './_entities/customer.entity';
import { Product } from './_entities/product.entity';
import { Purchase } from './_entities/purchase.entity';
import { User } from './_entities/user.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mariadb',
      host: process.env['DATABASE_HOST'],
      port: Number(process.env['DATABASE_PORT']),
      username: process.env['DATABASE_USERNAME'],
      password: process.env['DATABASE_PASSWORD'],
      database: process.env['DATABASE_NAME'],
      entities: [User, Customer, Product, Purchase],
      synchronize: true,
    }),
    UserModule,
    CustomerModule,
    ProductModule
  ],
})
export class AppModule {}
