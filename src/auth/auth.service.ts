import { Injectable } from '@nestjs/common';
import { LoginAuthDto } from './dto/login-auth.dto';

@Injectable()
export class AuthService {
  loginMock(dto: LoginAuthDto): boolean {
    return dto.user === 'RODRIGO' && dto.password === 'test-to-csti';
  }
}
