import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { LocalAuthGuard } from './auth.local.guard';
import { AuthService } from './auth.service';
import { LoggedInUserDto, LoginResponseDto } from './auth.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req: { user: LoggedInUserDto }): Promise<LoginResponseDto> {
    return this.authService.login(req.user);
  }
}
