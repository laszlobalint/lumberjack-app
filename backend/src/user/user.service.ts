import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './user.entity';
import { CreateUserDto, UpdateUserDto } from './user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return await this.userRepository.find({ relations: ['customers', 'products', 'purchases'] });
  }

  async findOne(id: number): Promise<User> {
    return await this.userRepository.findOneOrFail({ where: { id }, relations: ['customers', 'products', 'purchases'] });
  }

  async findOneByEmail(email: string): Promise<User> {
    return await this.userRepository.findOneOrFail({ where: { email } });
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = new User();
    user.name = createUserDto.name;
    user.email = createUserDto.email;
    user.password = createUserDto.password;
    user.email = createUserDto.email;
    user.customers = [];
    user.products = [];
    user.purchases = [];

    return this.userRepository.save(user);
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.userRepository.findOneOrFail({
      where: { id },
    });
    updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
    const updatedUser = Object.assign(user, updateUserDto);

    return this.userRepository.save(updatedUser);
  }

  async remove(id: number): Promise<DeleteResult> {
    const user = await this.userRepository.findOneOrFail({
      where: { id },
    });

    return this.userRepository.delete(user.id);
  }
}
