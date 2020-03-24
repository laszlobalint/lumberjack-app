import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/product/product.entity';
import { User } from 'src/user/user.entity';
import { DeleteResult, Repository } from 'typeorm';
import { Customer } from '../customer/customer.entity';
import { CreatePurchaseDto, UpdatePurchaseDto } from './purchase.dto';
import { Purchase } from './purchase.entity';

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
    // TODO: push creates foreign key, so two-way assignment is not needed.
    // TODO: use transaction

    const purchase = await this.purchaseRepository.save(
      new Purchase({
        amount: createPurchaseDto.amount,
        price: createPurchaseDto.price,
        completed: createPurchaseDto.completed,
        description: createPurchaseDto.description,
      }),
    );

    let product = await this.productRepository.findOneOrFail({
      where: { id: createPurchaseDto.productId },
      relations: ['purchases'],
    });
    product.amount -= purchase.amount;
    product.purchases.push(purchase);
    await this.productRepository.save(product);

    let customer: Customer;
    if (createPurchaseDto.customerId) {
      customer = await this.customerRepository.findOneOrFail({
        where: { id: createPurchaseDto.customerId },
        relations: ['purchases', 'user'],
      });
      customer.purchases.push(purchase);
      customer = await this.customerRepository.save(customer);
    } else if (createPurchaseDto.customer) {
      let createCustomerDto = createPurchaseDto.customer;
      customer = await this.customerRepository.save(
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

    let user = await this.userRepository.findOneOrFail({
      where: { id: createPurchaseDto.userId },
      relations: ['customers', 'purchases'],
    });
    user.customers.push(customer);
    user.purchases.push(purchase);
    await this.userRepository.save(user);

    return purchase;
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
