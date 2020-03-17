import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './controllers/app.controller';
import { Customer } from './entities/customer.entity';
import { Product } from './entities/product.entity';
import { Purchase } from './entities/purchase.entity';
import { User } from './entities/user.entity';
import { AppService } from './services/app.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      synchronize: true,
      entities: [User, Product, Purchase, Customer],
    }),
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
