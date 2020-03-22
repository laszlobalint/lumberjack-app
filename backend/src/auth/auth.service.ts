import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from './../user/user.service';
import { LoginDto, LoginResponseDto, UserDto } from './auth.dto';

@Injectable()
export class AuthService {
  constructor(private userService: UserService, private jwtService: JwtService) {}

  async validateUser(email: string, password: string): Promise<UserDto | null> {
    const user = await this.userService.findOneByEmail(email);
    if (user && (await this.passwordsAreEqual(user.password, password))) {
      const { password, ...result } = user;
      return result;
    }

    return null;
  }

  async login(loginDto: LoginDto): Promise<LoginResponseDto> {
    const { password, ...loggedInUserDto } = await this.userService.findOneByEmail(loginDto.email);
    const payload = { email: loggedInUserDto.email, sub: loggedInUserDto.id };

    return {
      access_token: this.jwtService.sign(payload),
      user: loggedInUserDto,
    };
  }

  private async passwordsAreEqual(hashedPassword: string, plainPassword: string): Promise<boolean> {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }
}
