import { Injectable } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
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

  @ApiResponse({ status: 200, description: 'Returned all customers.' })
  async findAll(): Promise<Customer[]> {
    return this.customerRepository.find({ relations: ['purchases', 'user'] });
  }

  @ApiResponse({ status: 200, description: 'Returned single customer.' })
  async findOne(id: number): Promise<Customer> {
    return await this.customerRepository.findOneOrFail({
      where: { id },
      relations: ['purchases', 'user'],
    });
  }

  @ApiResponse({ status: 201, description: 'Created a customer.' })
  async create(createCustomerDto: CreateCustomerDto): Promise<Customer> {
    let customer = new Customer();
    customer.name = createCustomerDto.name ? createCustomerDto.name : undefined;
    customer.address = createCustomerDto.address ? createCustomerDto.address : undefined;
    customer.phone = createCustomerDto.phone ? createCustomerDto.phone : undefined;
    customer.companyName = createCustomerDto.companyName ? createCustomerDto.companyName : undefined;
    customer.taxId = createCustomerDto.taxId ? createCustomerDto.taxId : undefined;
    customer.nationalId = createCustomerDto.nationalId ? createCustomerDto.nationalId : undefined;
    customer.checkingAccount = createCustomerDto.checkingAccount ? createCustomerDto.checkingAccount : undefined;
    customer.description = createCustomerDto.description ? createCustomerDto.description : undefined;
    customer.purchases = [];

    const user = await this.userRepository.findOneOrFail({
      where: { id: createCustomerDto.createdBy },
      relations: ['customers'],
    });

    let createdCustomer = await this.customerRepository.save(customer);
    user.customers.push(customer);
    this.userRepository.save(user);

    return createdCustomer;
  }

  @ApiResponse({ status: 204, description: 'Updated a customer.' })
  async update(id: number, updateCustomerDto: UpdateCustomerDto): Promise<Customer> {
    let customer = await this.customerRepository.findOneOrFail({
      where: { id },
    });
    let updatedCustomer = Object.assign(customer, updateCustomerDto);

    return this.customerRepository.save(updatedCustomer);
  }

  @ApiResponse({ status: 204, description: 'Deleted a customer.' })
  async remove(id: number): Promise<DeleteResult> {
    const customer = await this.customerRepository.findOneOrFail({
      where: { id },
    });

    return this.customerRepository.delete(customer);
  }
}
