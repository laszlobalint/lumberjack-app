import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '../user/user.entity';
import { Product } from './product.entity';
import { CreateProductDto, UpdateProductDto } from './product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<Product[]> {
    return await this.productRepository.find({ relations: ['purchases', 'user'] });
  }

  async findOne(id: number): Promise<Product> {
    return await this.productRepository.findOneOrFail({ where: { id }, relations: ['purchases', 'user'] });
  }

  async create(createProductDto: CreateProductDto): Promise<Product> {
    let product: Product | null = null;
    let user = await this.userRepository.findOne({
      where: { id: createProductDto.createdBy },
      relations: ['customers', 'products', 'purchases'],
    });

    product = await this.productRepository.save(
      new Product({
        name: createProductDto.name,
        price: createProductDto.price,
        amount: createProductDto.amount,
        description: createProductDto.description,
        user,
      }),
    );

    return product;
  }

  async update(id: number, updateProductDto: UpdateProductDto): Promise<Product> {
    let product = await this.productRepository.findOneOrFail({
      where: { id },
    });
    let updatedProduct = Object.assign(product, updateProductDto);

    return this.productRepository.save(updatedProduct);
  }

  async remove(id: number): Promise<number> {
    let product = await this.productRepository.findOneOrFail({
      where: { id },
    });
    await this.productRepository.delete(product.id);

    return id;
  }
}
