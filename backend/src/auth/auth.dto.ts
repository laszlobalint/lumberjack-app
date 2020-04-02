import { IsNotEmpty } from 'class-validator';
import { User } from '../user/user.entity';

export class LoginDto {
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;
}

export class LoginResponseDto {
  access_token: string;
  user: User;
}

export class RefreshTokenDto {
  payload: {
    email: string;
    sub: number;
    iat: number;
    exp: number;
  };
  token: string;
  ownerStrategyName: string;
  createdAt: string;
}

export class RefreshtTokenResponseDto {
  access_token: string;
}
