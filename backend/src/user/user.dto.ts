import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  name: string;

  @IsEmail()
  email?: string;
}

export class UpdateUserDto {
  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  name: string;

  @IsEmail()
  email?: string;
}
