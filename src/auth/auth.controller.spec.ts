import { JwtModule } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

describe('AuthController', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        JwtModule.registerAsync({
          global: true,
          useFactory: () => ({
            secret: '12345678',
            signOptions: { expiresIn: '600s' },
          }),
        }),
      ],
      controllers: [AuthController],
      providers: [AuthService],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should be fail login', () => {
    const payload = { user: 'MY_USER', password: 'example' };
    try {
      controller.login(payload);
    } catch (e) {
      expect(e?.message).toBe('BAD_CREDENTIALS');
    }
  });

  it('should be logged after that', () => {
    const payload = { user: 'MY_USER', password: 'demo-nest-pwd-ex' };
    const result = controller.login(payload);
    expect(result).toBeDefined();
    expect(result.indexOf('ey') === 0).toBeTruthy();
  });
});
