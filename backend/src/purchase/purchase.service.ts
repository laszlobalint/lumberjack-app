import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { classToPlain } from 'class-transformer';
import { Connection, DeleteResult, Repository } from 'typeorm';
import { Customer } from '../customer/customer.entity';
import { Product } from '../product/product.entity';
import { User } from '../user/user.entity';
import { CreatePurchaseDto, UpdatePurchaseDto } from './purchase.dto';
import { Purchase } from './purchase.entity';

@Injectable()
export class PurchaseService {
  constructor(
    @InjectRepository(Purchase)
    private readonly purchaseRepository: Repository<Purchase>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
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
      const productRepository = queryRunner.manager.getRepository(Product);
      const customerRepository = queryRunner.manager.getRepository(Customer);
      const userRepository = queryRunner.manager.getRepository(User);

      purchase = await purchaseRepository.save(
        new Purchase({
          amount: createPurchaseDto.amount,
          reduceStock: createPurchaseDto.reduceStock,
          price: createPurchaseDto.price,
          description: createPurchaseDto.description,
          deliveryDate: createPurchaseDto.deliveryDate,
          completed: false,
        }),
      );

      const product = await productRepository.findOneOrFail({
        where: { id: createPurchaseDto.productId },
        relations: ['purchases'],
      });

      product.purchases.push(purchase);
      await productRepository.save(product);

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
        const createCustomerDto = createPurchaseDto.customer;
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

      const user = await userRepository.findOneOrFail({
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
    const purchase = await this.purchaseRepository.findOneOrFail({
      where: { id },
      relations: ['product'],
    });

    const product = await this.productRepository.findOneOrFail({
      where: { id: purchase.product.id },
      relations: ['purchases'],
    });

    const uncomplete = purchase.completed && !updatePurchaseDto.completed;
    const doComplete = !purchase.completed && updatePurchaseDto.completed;
    const isCompleted = purchase.completed && updatePurchaseDto.completed;
    const unsetReduceStock = purchase.reduceStock && !updatePurchaseDto.reduceStock;
    const setReduceStock = !purchase.reduceStock && updatePurchaseDto.reduceStock;
    const stockHasBeenReduced = (purchase.reduceStock && updatePurchaseDto.reduceStock) || unsetReduceStock;
    const stockNeedsReduce = (purchase.reduceStock && updatePurchaseDto.reduceStock) || setReduceStock;

    if ((uncomplete && stockHasBeenReduced) || (isCompleted && unsetReduceStock)) {
      product.amount += updatePurchaseDto.amount;
    } else if ((doComplete && stockNeedsReduce) || (isCompleted && setReduceStock)) {
      product.amount -= updatePurchaseDto.amount;
    }

    await this.productRepository.save(product);
    const updatedPurchase = Object.assign(purchase, updatePurchaseDto);

    return this.purchaseRepository.save(updatedPurchase);
  }

  async remove(id: number): Promise<DeleteResult> {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const purchaseRepository = queryRunner.manager.getRepository(Purchase);
      const productRepository = queryRunner.manager.getRepository(Product);

      const purchase = await purchaseRepository.findOneOrFail({
        where: { id },
        relations: ['product'],
      });

      if (purchase.reduceStock) {
        const product = await productRepository.findOneOrFail({
          where: { id: purchase.product.id },
          relations: ['purchases'],
        });
        product.amount += purchase.amount;
        await productRepository.save(product);
      }

      await queryRunner.commitTransaction();

      return this.purchaseRepository.delete(purchase.id);
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
}
