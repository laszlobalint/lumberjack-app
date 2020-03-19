import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Customer } from '../entities/customer.entity';
import { User } from '../entities/user.entity';
import { CreateCustomerDto } from './create-customer.dto';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<Customer[]> {
    return await this.customerRepository.find();
  }

  async findOne(id: number): Promise<Customer> {
    return await this.customerRepository.findOne(id);
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

    const user = await this.userRepository.findOne({
      where: { id: createCustomerDto.createdBy },
      relations: ['customers']
    });
    user.customers.push(customer);

    return await this.customerRepository.save(customer);
  }
}
