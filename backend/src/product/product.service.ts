import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { classToPlain } from 'class-transformer';
import { Connection, Repository } from 'typeorm';
import { User } from '../user/user.entity';
import { CreateProductDto, UpdateProductDto } from './product.dto';
import { Product } from './product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly connection: Connection,
  ) {}

  async findAll(): Promise<Product[]> {
    return await this.productRepository.find({ relations: ['purchases', 'user'] });
  }

  async findOne(id: number): Promise<Product> {
    return await this.productRepository.findOneOrFail({ where: { id }, relations: ['purchases', 'user'] });
  }

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    let product: Product | null = null;
    try {
      const productRepository = queryRunner.manager.getRepository(Product);
      let user = await this.userRepository.findOne({
        where: { id: createProductDto.createdBy },
        relations: ['customers', 'products', 'purchases'],
      });

      product = await productRepository.save(
        new Product({
          name: createProductDto.name,
          price: createProductDto.price,
          amount: createProductDto.amount,
          description: createProductDto.description,
          user,
        }),
      );

      await queryRunner.commitTransaction();
      product = {
        ...product,
        user: classToPlain(user) as User,
      };
    } catch (error) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();

      return product;
    }
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
