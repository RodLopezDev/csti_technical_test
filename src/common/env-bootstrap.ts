import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModuleAsyncOptions } from '@nestjs/jwt';

export const EnvBootstrap = {
  isGlobal: true,
  load: [
    () => {
      Logger.log(`PORT: ${process.env.PORT}`);
      Logger.log(`JWT_SECRET: ${process.env.JWT_SECRET}`);
      return {
        port: Number(process.env.PORT),
        jwt: {
          secret: Number(process.env.JWT_SECRET),
        },
      };
    },
  ],
};

export const JwtConfig: JwtModuleAsyncOptions = {
  global: true,
  inject: [ConfigService],
  useFactory: (config: ConfigService) => ({
    secret: String(config.get<string>('jwt.secret')),
    signOptions: { expiresIn: '600s' },
  }),
};
