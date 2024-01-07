import { Module } from '@nestjs/common';
import { ExchangerService } from './exchanger.service';
import { ExchangerController } from './exchanger.controller';

@Module({
  controllers: [ExchangerController],
  providers: [ExchangerService],
})
export class ExchangerModule {}
