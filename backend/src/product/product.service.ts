import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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

  async findAll(): Promise<Product[]> {
    return await this.productRepository.find();
  }

  async findOne(id: number): Promise<Product> {
    return await this.productRepository.findOne(id);
  }

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
