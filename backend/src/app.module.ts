import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { CustomerModule } from './customer/customer.module';
import { ProductModule } from './product/product.module';
import { PurchaseModule } from './purchase/purchase.module';
import { UserModule } from './user/user.module';
import { Customer } from './_entities/customer.entity';
import { Product } from './_entities/product.entity';
import { Purchase } from './_entities/purchase.entity';
import { User } from './_entities/user.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        const { get } = configService;
        return {
          type: 'mariadb',
          host: get<string>('DATABASE_HOST'),
          port: get<number>('DATABASE_PORT'),
          username: get<string>('DATABASE_USERNAME'),
          password: get<string>('DATABASE_PASSWORD'),
          database: get<string>('DATABASE_NAME'),
          entities: [User, Customer, Product, Purchase],
          synchronize: true,
        };
      },
      inject: [ConfigService],
    }),
    UserModule,
    CustomerModule,
    ProductModule,
    PurchaseModule,
    AuthModule,
  ],
  controllers: [AuthController],
})
export class AppModule {}
