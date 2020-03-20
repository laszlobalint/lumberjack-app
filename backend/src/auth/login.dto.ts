import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ type: 'string' })
  username: string;

  @ApiProperty({ type: 'string' })
  password: string;
}
