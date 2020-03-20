import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserModule } from '../user/user.module';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { Product } from '../_entities/product.entity';
import { User } from '../_entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product, User]), UserModule],
  controllers: [ProductController],
  providers: [ProductService],
  exports: [TypeOrmModule],
})
export class ProductModule {}
