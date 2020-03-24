import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/product/product.entity';
import { User } from 'src/user/user.entity';
import { Connection, DeleteResult, Repository } from 'typeorm';
import { Customer } from '../customer/customer.entity';
import { CreatePurchaseDto, UpdatePurchaseDto } from './purchase.dto';
import { Purchase } from './purchase.entity';

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

  async create(createPurchaseDto: CreatePurchaseDto): Promise<Purchase> {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    let purchase: Purchase | null = null;
    try {
      const purchaseRepository = queryRunner.manager.getRepository(Purchase);
      purchase = await purchaseRepository.save(
        new Purchase({
          amount: createPurchaseDto.amount,
          price: createPurchaseDto.price,
          completed: createPurchaseDto.completed,
          description: createPurchaseDto.description,
        }),
      );

      const productRepository = queryRunner.manager.getRepository(Product);
      let product = await productRepository.findOneOrFail({
        where: { id: createPurchaseDto.productId },
        relations: ['purchases'],
      });
      product.amount -= purchase.amount;
      product.purchases.push(purchase);
      await productRepository.save(product);

      const customerRepository = queryRunner.manager.getRepository(Customer);
      let customer: Customer;
      if (createPurchaseDto.customerId) {
        customer = await customerRepository.findOneOrFail({
          where: { id: createPurchaseDto.customerId },
          relations: ['purchases', 'user'],
        });
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
        where: { id: createPurchaseDto.userId },
        relations: ['customers', 'purchases'],
      });
      user.customers.push(customer);
      user.purchases.push(purchase);
      await userRepository.save(user);

      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
      return purchase;
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
