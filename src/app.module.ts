import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';

import { AuthModule } from './auth/auth.module';
import { EnvBootstrap, JwtConfig } from './common/env-bootstrap';
import { ExchangeRateModule } from './exchange-rate/exchange-rate.module';

@Module({
  imports: [
    ConfigModule.forRoot(EnvBootstrap),
    JwtModule.registerAsync(JwtConfig),
    AuthModule,
    ExchangeRateModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
