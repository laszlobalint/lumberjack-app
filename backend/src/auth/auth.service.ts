import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from './../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string) {
    const user = await this.userService.findOneByUsername(username);
    const passwordHashed = await bcrypt.hash(password, 10);

    // TODO: review
    if (user && user.password === passwordHashed) {
      const { password, ...result } = user;
      return result;
    }

    return null;
  }

  async login(username: string, userId: string) {
    const payload = { username, sub: userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
