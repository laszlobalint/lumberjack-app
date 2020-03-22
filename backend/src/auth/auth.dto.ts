import { ApiProperty } from '@nestjs/swagger';
import { User } from '../user/user.entity';

export class LoginDto {
  @ApiProperty({ type: 'string' })
  email: string;

  @ApiProperty({ type: 'string' })
  password: string;
}

export class LoginResponseDto {
  access_token: string;
  user: User;
}
