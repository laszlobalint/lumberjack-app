import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { classToPlain } from 'class-transformer';

import { UserService } from './../user/user.service';
import { User } from '../user/user.entity';
import { LoginDto, LoginResponseDto, TokenDto } from './auth.dto';

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

  async refreshToken(tokenDto: TokenDto): Promise<TokenDto> {
    const decoded: any = this.jwtService.decode(tokenDto.access_token);
    return {
      access_token: this.jwtService.sign({ email: decoded.email, sub: decoded.sub }),
    };
  }

  private async passwordsAreEqual(hashedPassword: string, plainPassword: string): Promise<boolean> {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }
}
