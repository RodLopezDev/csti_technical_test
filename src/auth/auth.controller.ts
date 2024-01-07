import { Controller, Post, Body } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';

@Controller('auth')
export class AuthController {
  @Post()
  login(@Body() createAuthDto: CreateAuthDto) {
    return true;
  }
}
