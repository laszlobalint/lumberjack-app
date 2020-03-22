import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoggedInUserDto, LoginResponseDto } from './login.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UseGuards(AuthGuard('local'))
  async login(@Body() user: LoggedInUserDto): Promise<LoginResponseDto> {
    return this.authService.login(user);
  }

  @Post('logout')
  @UseGuards(AuthGuard('jwt'))
  async logout(@Req() request): Promise<string> {
    return 'Logged out.';
  }
}
