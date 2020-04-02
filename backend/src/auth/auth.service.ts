import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { classToPlain } from 'class-transformer';
import * as bcrypt from 'bcrypt';
import { UserService } from './../user/user.service';
import { User } from '../user/user.entity';
import { LoginDto, LoginResponseDto, AccessTokenDto, DecodedTokenDto } from './auth.dto';

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

  async refreshToken(accessTokenDto: AccessTokenDto): Promise<AccessTokenDto> {
    const decodedToken = this.jwtService.decode(accessTokenDto.access_token) as DecodedTokenDto;
    return {
      access_token: this.jwtService.sign({ email: decodedToken.email, sub: decodedToken.sub }),
    };
  }

  private async passwordsAreEqual(hashedPassword: string, plainPassword: string): Promise<boolean> {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }
}
