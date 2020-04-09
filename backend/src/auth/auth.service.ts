/* eslint-disable @typescript-eslint/camelcase */
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { classToPlain } from 'class-transformer';
import { User } from '../user/user.entity';
import { UserService } from './../user/user.service';
import { DecodedToken, LoginDto, LoginResponseDto, RefreshTokenResponseDto } from './auth.dto';

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

    return {
      access_token: this.jwtService.sign({ email: user.email, sub: user.id }),
      user: classToPlain(user) as User,
    };
  }

  async refreshToken(refreshTokenDto: RefreshTokenResponseDto): Promise<RefreshTokenResponseDto> {
    const { email } = this.jwtService.decode(refreshTokenDto.access_token) as DecodedToken;
    const user = await this.userService.findOneByEmail(email);

    return {
      access_token: this.jwtService.sign({ email: user.email, sub: user.id }),
    };
  }

  private async passwordsAreEqual(hashedPassword: string, plainPassword: string): Promise<boolean> {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }
}
