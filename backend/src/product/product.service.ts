import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult } from 'typeorm';

import { Product } from './product.entity';
import { User } from '../user/user.entity';
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
    let product = new Product();
    product.name = createProductDto.name;
    product.price = createProductDto.price;
    product.amount = createProductDto.amount;
    product.description = createProductDto.description ? createProductDto.description : undefined;

    let user = await this.userRepository.findOne({
      where: { id: createProductDto.createdBy },
      relations: ['customers', 'products', 'purchases'],
    });

    let createdProduct = await this.productRepository.save(product);
    user.products.push(createdProduct);
    this.userRepository.save(user);

    return createdProduct;
  }

  async update(id: number, updateProductDto: UpdateProductDto): Promise<Product> {
    let product = await this.productRepository.findOneOrFail({
      where: { id },
    });
    let updatedProduct = Object.assign(product, updateProductDto);

    return this.productRepository.save(updatedProduct);
  }

  async remove(id: number): Promise<DeleteResult> {
    let product = await this.productRepository.findOneOrFail({
      where: { id },
    });

    return this.productRepository.delete(product.id);
  }
}
