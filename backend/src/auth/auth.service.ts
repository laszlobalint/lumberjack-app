import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { classToPlain } from 'class-transformer';
import { User } from '../user/user.entity';
import { UserService } from './../user/user.service';
import { LoginDto, LoginResponseDto, RefreshtTokenResponseDto } from './auth.dto';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService, private readonly jwtService: JwtService) {}

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.userService.findOneByEmail(email);
    if (user && (await this.passwordsAreEqual(user.password, password))) {
      return user;
    }
    return null;
  }

  async login(loginDto: LoginDto): Promise<LoginResponseDto> {
    const user = await this.userService.findOneByEmail(loginDto.email);
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
      user: classToPlain(user) as User,
    };
  }

  async refreshToken(email: string, userId: number): Promise<RefreshtTokenResponseDto> {
    return {
      access_token: this.jwtService.sign({ email: email, sub: userId }),
    };
  }

  private async passwordsAreEqual(hashedPassword: string, plainPassword: string): Promise<boolean> {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }
}
