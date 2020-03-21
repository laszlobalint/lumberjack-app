import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { UserService } from './../user/user.service';
import { LoggedInUserDto, LoginResponseDto } from './login.dto';

@Injectable()
export class AuthService {
  constructor(private userService: UserService, private jwtService: JwtService) {}

  async validateUser(username: string, password: string): Promise<LoggedInUserDto | null> {
    const user = await this.userService.findOneByUsername(username);

    if (user && this.passwordsAreEqual(user.password, password)) {
      const { password, ...result } = user;
      return result;
    }

    return null;
  }

  async login(user: LoggedInUserDto): Promise<LoginResponseDto> {
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
      ...user,
    };
  }

  private async passwordsAreEqual(hashedPassword: string, plainPassword: string): Promise<boolean> {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }
}
