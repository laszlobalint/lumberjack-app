import { Injectable, Param } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ApiResponse } from '@nestjs/swagger';
import { Repository } from 'typeorm';

import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return await this.userRepository.find({ relations: ['customers'] });
  }

  @ApiResponse({ status: 200, description: 'Returned single user by ID.' })
  async findOne(id: number): Promise<User> {
    return await this.userRepository.findOne({ where: { id } });
  }

  @ApiResponse({ status: 200, description: 'Returned single user by username.' })
  async findOneByUsername(username: string): Promise<User> {
    return await this.userRepository.findOne({ where: { username } });
  }
}
