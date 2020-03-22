import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult } from 'typeorm';

import { Customer } from 'src/customer/customer.entity';
import { User } from 'src/user/user.entity';
import { Product } from 'src/product/product.entity';
import { Purchase } from './purchase.entity';
import { UpdatePurchaseDto, CreatePurchaseDto } from './purchase.dto';

@Injectable()
export class PurchaseService {
  constructor(
    @InjectRepository(Purchase)
    private readonly purchaseRepository: Repository<Purchase>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
  ) {}

  async findAll(): Promise<Purchase[]> {
    return await this.purchaseRepository.find({ relations: ['customer', 'product', 'user'] });
  }

  async findOne(id: number): Promise<Purchase> {
    return await this.purchaseRepository.findOneOrFail({ where: { id }, relations: ['customer', 'product', 'user'] });
  }

  async create(createPurchaseDto: CreatePurchaseDto): Promise<Purchase> {
    let purchase = new Purchase();
    purchase.amount = createPurchaseDto.amount;
    purchase.completed = createPurchaseDto.completed;
    purchase.description = createPurchaseDto.description ? createPurchaseDto.description : undefined;

    let user = await this.userRepository.findOneOrFail({
      where: { id: createPurchaseDto.userId },
      relations: ['customers', 'products', 'purchases'],
    });
    let product = await this.productRepository.findOneOrFail({
      where: { id: createPurchaseDto.productId },
      relations: ['purchases', 'user'],
    });
    let customer = await this.customerRepository.findOneOrFail({
      where: { id: createPurchaseDto.customerId },
      relations: ['purchases', 'user'],
    });

    let createdPurchase = await this.purchaseRepository.save(purchase);

    user.purchases.push(createdPurchase);
    product.purchases.push(createdPurchase);
    customer.purchases.push(createdPurchase);

    this.userRepository.save(user);
    this.productRepository.save(product);
    this.customerRepository.save(customer);

    return createdPurchase;
  }

  async update(id: number, updatePurchaseDto: UpdatePurchaseDto): Promise<Purchase> {
    let purchase = await this.productRepository.findOneOrFail({
      where: { id },
    });
    let updatedPurchase = Object.assign(purchase, updatePurchaseDto);

    return this.purchaseRepository.save(updatedPurchase);
  }

  async remove(id: number): Promise<DeleteResult> {
    let purchase = await this.purchaseRepository.findOneOrFail({
      where: { id },
    });

    return this.purchaseRepository.delete(purchase.id);
  }
}
