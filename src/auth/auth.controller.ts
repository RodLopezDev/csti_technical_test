import { ApiTags } from '@nestjs/swagger';
import { JwtService } from '@nestjs/jwt';
import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';

import { LoginAuthDto } from './dto/login-auth.dto';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly jwtService: JwtService) {}

  @Post()
  login(@Body() dto: LoginAuthDto) {
    const isLoggin = dto.user === 'RODRIGO' && dto.password === 'test-to-csti';
    if (!isLoggin) {
      throw new UnauthorizedException('BAD_CREDENTIALS');
    }

    return this.jwtService.sign({ user: dto.user });
  }
}
