import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { AuthModule } from './auth/auth.module';
import { ExchangeRateModule } from './exchange-rate/exchange-rate.module';

@Module({
  imports: [
    JwtModule.registerAsync({
      global: true,
      useFactory: () => ({
        secret: '12345678',
        signOptions: { expiresIn: '600s' },
      }),
    }),
    AuthModule,
    ExchangeRateModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
