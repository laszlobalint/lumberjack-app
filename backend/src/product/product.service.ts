import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ApiResponse } from '@nestjs/swagger';
import { Repository } from 'typeorm';

import { Product } from './product.entity';
import { User } from '../user/user.entity';
import { CreateProductDto } from './product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  @ApiResponse({ status: 200, description: 'Return all products.' })
  async findAll(): Promise<Product[]> {
    return await this.productRepository.find();
  }

  @ApiResponse({ status: 200, description: 'Return single product.' })
  async findOne(id: number): Promise<Product> {
    return await this.productRepository.findOne(id);
  }

  @ApiResponse({ status: 201, description: 'Create a product.' })
  async create(createProductDto: CreateProductDto): Promise<Product> {
    let product = new Product();
    product.name = createProductDto.name;
    product.price = createProductDto.price;
    product.amount = createProductDto.amount;
    product.description = createProductDto.description;

    const user = await this.userRepository.findOne({
      where: { id: createProductDto.createdBy },
      relations: ['products'],
    });
    user.products.push(product);

    return await this.productRepository.save(product);
  }
}
