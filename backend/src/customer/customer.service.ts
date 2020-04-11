import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/user.entity';
import { Customer } from './customer.entity';
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
    return this.customerRepository.find();
  }

  async findOne(id: number): Promise<Customer> {
    return await this.customerRepository.findOneOrFail({ where: { id } });
  }

  async create(createCustomerDto: CreateCustomerDto, userId: number): Promise<Customer> {
    const user = await this.userRepository.findOneOrFail({
      where: { id: userId },
      relations: ['customers', 'products', 'purchases'],
    });

    const customer = new Customer({
      name: createCustomerDto.name,
      address: createCustomerDto.address,
      phone: createCustomerDto.phone,
      companyName: createCustomerDto.companyName,
      taxId: createCustomerDto.taxId,
      nationalId: createCustomerDto.nationalId,
      checkingAccount: createCustomerDto.checkingAccount,
      description: createCustomerDto.description,
      purchases: [],
      user,
    });

    return await this.customerRepository.save(customer);
  }

  async update(id: number, updateCustomerDto: UpdateCustomerDto): Promise<Customer> {
    const customer = await this.customerRepository.findOneOrFail({
      where: { id },
    });
    const updatedCustomer = Object.assign(customer, updateCustomerDto);

    return this.customerRepository.save(updatedCustomer);
  }

  async remove(id: number): Promise<number> {
    const customer = await this.customerRepository.findOneOrFail({
      where: { id },
    });
    await this.customerRepository.delete(customer.id);

    return id;
  }
}
