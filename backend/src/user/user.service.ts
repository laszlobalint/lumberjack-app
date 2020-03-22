import { Injectable } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { DeleteResult, Repository } from 'typeorm';
import { CreateUserDto, UpdateUserDto } from './user.dto';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return await this.userRepository.find({ relations: ['customers', 'products', 'purchases'] });
  }

  @ApiResponse({ status: 200, description: 'Returned single user by ID.' })
  async findOne(id: number): Promise<User> {
    return await this.userRepository.findOneOrFail({ where: { id }, relations: ['customers', 'products', 'purchases'] });
  }

  @ApiResponse({ status: 200, description: 'Returned single user by email.' })
  async findOneByEmail(email: string): Promise<User> {
    return await this.userRepository.findOneOrFail({ where: { email } });
  }

  @ApiResponse({ status: 201, description: 'Created a user.' })
  async create(createUserDto: CreateUserDto): Promise<User> {
    let user = new User();
    user.name = createUserDto.name;
    user.email = createUserDto.email;
    user.password = createUserDto.password;
    user.email = createUserDto.email ? createUserDto.email : undefined;
    user.customers = [];
    user.products = [];
    user.purchases = [];

    return this.userRepository.save(user);
  }

  @ApiResponse({ status: 204, description: 'Modified a user.' })
  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    let user = await this.userRepository.findOneOrFail({
      where: { id },
    });
    updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
    let updatedUser = Object.assign(user, updateUserDto);

    return this.userRepository.save(updatedUser);
  }

  @ApiResponse({ status: 204, description: 'Deleted a user.' })
  async remove(id: number): Promise<DeleteResult> {
    let user = await this.userRepository.findOneOrFail({
      where: { id },
    });

    return this.userRepository.delete(user);
  }
}
