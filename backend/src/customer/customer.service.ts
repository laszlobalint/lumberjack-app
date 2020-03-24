import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult } from 'typeorm';

import { Customer } from './customer.entity';
import { User } from '../user/user.entity';
import { CreateCustomerDto, UpdateCustomerDto } from './customer.dto';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<Customer[]> {
    return this.customerRepository.find({ relations: ['purchases', 'user'] });
  }

  async findOne(id: number): Promise<Customer> {
    return await this.customerRepository.findOneOrFail({
      where: { id },
      relations: ['purchases', 'user'],
    });
  }

  async create(createCustomerDto: CreateCustomerDto): Promise<Customer> {
    let customer = new Customer();
    customer.name = createCustomerDto.name;
    customer.address = createCustomerDto.address;
    customer.phone = createCustomerDto.phone;
    customer.companyName = createCustomerDto.companyName;
    customer.taxId = createCustomerDto.taxId;
    customer.nationalId = createCustomerDto.nationalId;
    customer.checkingAccount = createCustomerDto.checkingAccount;
    customer.description = createCustomerDto.description;
    customer.purchases = [];

    let user = await this.userRepository.findOneOrFail({
      where: { id: createCustomerDto.createdBy },
      relations: ['customers', 'products', 'purchases'],
    });

    let createdCustomer = await this.customerRepository.save(customer);
    user.customers.push(customer);
    this.userRepository.save(user);

    return createdCustomer;
  }

  async update(id: number, updateCustomerDto: UpdateCustomerDto): Promise<Customer> {
    let customer = await this.customerRepository.findOneOrFail({
      where: { id },
    });
    let updatedCustomer = Object.assign(customer, updateCustomerDto);

    return this.customerRepository.save(updatedCustomer);
  }

  async remove(id: number): Promise<DeleteResult> {
    const customer = await this.customerRepository.findOneOrFail({
      where: { id },
    });

    return this.customerRepository.delete(customer.id);
  }
}
