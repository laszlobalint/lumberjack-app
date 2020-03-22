import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from './../user/user.service';
import { LoggedInUserDto, LoginDto, LoginResponseDto } from './login.dto';

@Injectable()
export class AuthService {
  constructor(private userService: UserService, private jwtService: JwtService) {}

  async validateUser(email: string, password: string): Promise<LoggedInUserDto | null> {
    const user = await this.userService.findOne(email);
    if (user && (await this.passwordsAreEqual(user.password, password))) {
      const { password, ...result } = user;
      return result;
    }

    return null;
  }

  async login(loginDto: LoginDto): Promise<LoginResponseDto> {
    const { password, ...result } = await this.userService.findOne(loginDto.email);
    const payload = { email: result.email, sub: result.id };

    return {
      access_token: this.jwtService.sign(payload),
      ...result,
    };
  }

  private async passwordsAreEqual(hashedPassword: string, plainPassword: string): Promise<boolean> {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }
}
