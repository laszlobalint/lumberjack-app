export class CreateUserDto {
  username: string;
  password: string;
  name: string;
  email?: string;
}

export class UpdateUserDto {
  password: string;
  name: string;
  email?: string;
}
