import { Injectable } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

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

  @ApiResponse({ status: 200, description: 'Return all customers.' })
  async findAll(): Promise<Customer[]> {
    return this.customerRepository.find();
  }

  @ApiResponse({ status: 200, description: 'Return single customer.' })
  async findOne(id: number): Promise<Customer> {
    return await this.customerRepository.findOne({
      where: { id },
      relations: ['purchases'],
    });
  }

  @ApiResponse({ status: 201, description: 'Create a customer.' })
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

    const user = await this.userRepository.findOne({
      where: { id: createCustomerDto.createdBy },
      relations: ['customers'],
    });
    user.customers.push(customer);

    return await this.customerRepository.save(customer);
  }

  @ApiResponse({ status: 201, description: 'Updated a customer.' })
  async update(id: number, updateCustomerDto: UpdateCustomerDto) {
    let customer = await this.customerRepository.findOne(id);
    let updatedCustomer = Object.assign(customer, updateCustomerDto);

    return this.customerRepository.save(updatedCustomer);
  }
}
