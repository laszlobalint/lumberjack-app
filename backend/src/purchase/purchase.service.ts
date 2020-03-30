import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, DeleteResult, Repository } from 'typeorm';
import { classToPlain } from 'class-transformer';

import { Product } from '../product/product.entity';
import { User } from '../user/user.entity';
import { Customer } from '../customer/customer.entity';
import { Purchase } from './purchase.entity';
import { CreatePurchaseDto, UpdatePurchaseDto } from './purchase.dto';

@Injectable()
export class PurchaseService {
  constructor(
    @InjectRepository(Purchase)
    private readonly purchaseRepository: Repository<Purchase>,
    private readonly connection: Connection,
  ) {}

  async findAll(): Promise<Purchase[]> {
    return await this.purchaseRepository.find({ relations: ['customer', 'product', 'user'] });
  }

  async findOne(id: number): Promise<Purchase> {
    return await this.purchaseRepository.findOneOrFail({ where: { id }, relations: ['customer', 'product', 'user'] });
  }

  async create(createPurchaseDto: CreatePurchaseDto, userId: number): Promise<Purchase> {
    if (!createPurchaseDto.customerId && !createPurchaseDto.customer) {
      throw new UnprocessableEntityException('Field customerId or customer must exist.');
    }

    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    let purchase: Purchase | null = null;
    try {
      const purchaseRepository = queryRunner.manager.getRepository(Purchase);
      purchase = await purchaseRepository.save(
        new Purchase({
          amount: createPurchaseDto.amount,
          reduceStock: createPurchaseDto.reduceStock,
          price: createPurchaseDto.price,
          description: createPurchaseDto.description,
          completed: false,
        }),
      );

      const productRepository = queryRunner.manager.getRepository(Product);
      let product = await productRepository.findOneOrFail({
        where: { id: createPurchaseDto.productId },
        relations: ['purchases'],
      });
      product.amount -= createPurchaseDto.reduceStock ? purchase.amount : 0;
      product.purchases.push(purchase);
      await productRepository.save(product);

      const customerRepository = queryRunner.manager.getRepository(Customer);
      let customer: Customer;
      if (createPurchaseDto.customerId) {
        customer = await customerRepository.findOneOrFail({
          where: { id: createPurchaseDto.customerId },
          relations: ['purchases'],
        });

        if (createPurchaseDto.customer) {
          customer = Object.assign(customer, createPurchaseDto.customer);
        }

        customer.purchases.push(purchase);
        customer = await customerRepository.save(customer);
      } else if (createPurchaseDto.customer) {
        let createCustomerDto = createPurchaseDto.customer;
        customer = await customerRepository.save(
          new Customer({
            name: createCustomerDto.name,
            address: createCustomerDto.address,
            phone: createCustomerDto.phone,
            companyName: createCustomerDto.companyName,
            taxId: createCustomerDto.taxId,
            nationalId: createCustomerDto.nationalId,
            checkingAccount: createCustomerDto.checkingAccount,
            description: createCustomerDto.description,
            purchases: [purchase],
          }),
        );
      }

      const userRepository = queryRunner.manager.getRepository(User);
      let user = await userRepository.findOneOrFail({
        where: { id: userId },
        relations: ['customers', 'purchases'],
      });
      user.customers.push(customer);
      user.purchases.push(purchase);
      await userRepository.save(user);

      await queryRunner.commitTransaction();
      purchase = {
        ...purchase,
        customer: classToPlain(customer) as Customer,
        product: classToPlain(product) as Product,
        user: classToPlain(user) as User,
      };

      return purchase;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async update(id: number, updatePurchaseDto: UpdatePurchaseDto): Promise<Purchase> {
    let purchase = await this.purchaseRepository.findOneOrFail({
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
