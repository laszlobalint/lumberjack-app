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
