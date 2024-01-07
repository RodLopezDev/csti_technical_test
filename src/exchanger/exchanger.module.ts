import { Module } from '@nestjs/common';

import { ExchangerController } from './exchanger.controller';
import { ExchangeRateModule } from '../exchange-rate/exchange-rate.module';

@Module({
  controllers: [ExchangerController],
  providers: [],
  imports: [ExchangeRateModule],
})
export class ExchangerModule {}
