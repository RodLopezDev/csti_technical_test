import { ApiTags } from '@nestjs/swagger';
import { JwtService } from '@nestjs/jwt';
import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';

import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/login-auth.dto';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly jwtService: JwtService,
    private readonly authService: AuthService,
  ) {}

  @Post('login')
  login(@Body() dto: LoginAuthDto) {
    const isLoggin = this.authService.loginMock(dto);
    if (!isLoggin) {
      throw new UnauthorizedException('BAD_CREDENTIALS');
    }

    return this.jwtService.sign({ user: dto.user });
  }
}
