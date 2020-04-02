import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../user/user.module';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { User } from '../user/user.entity';
import { Product } from './product.entity';
import { Purchase } from '../purchase/purchase.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Purchase, Product, User]), UserModule],
  controllers: [ProductController],
  providers: [ProductService],
  exports: [TypeOrmModule],
})
export class ProductModule {}
