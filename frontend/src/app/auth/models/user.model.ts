export enum UserRole {
  Admin = 'admin',
  Guest = 'guest',
}

export interface UserDto {
  id: number;
  email: string;
  name: string;
  role: UserRole;
}
