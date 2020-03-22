import { UserDto } from './user.model';

export class LoginResponseDto {
  access_token: string;
  user: UserDto;
}
