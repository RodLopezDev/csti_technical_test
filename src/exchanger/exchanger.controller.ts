import {
  Post,
  Body,
  UseGuards,
  Controller,
  NotFoundException,
  HttpCode,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { CurrencyFormat } from '../utils/numbers';
import { ExchangerDto } from './dto/exchanger.dto';
import { AuthGuard } from '../auth/strategy/auth.guard';
import { ExchangeRateService } from '../exchange-rate/exchange-rate.service';

@ApiBearerAuth()
@UseGuards(AuthGuard)
@ApiTags('Exchange')
@Controller('exchange')
export class ExchangerController {
  constructor(private readonly exchangeRateService: ExchangeRateService) {}

  @Post()
  @HttpCode(200)
  exchange(@Body() dto: ExchangerDto) {
    const rate = this.exchangeRateService.findOne(
      dto.sourceCurrency,
      dto.targetCurrency,
    );
    if (!rate) {
      throw new NotFoundException('EXCHANGE_RATE_NOT_FOUND');
    }

    const exchangedAmount = CurrencyFormat(dto.amount * rate.rate);
    return {
      amount: CurrencyFormat(dto.amount),
      exchangeRate: CurrencyFormat(rate.rate),
      exchangedAmount,
      sourceCurrency: dto.sourceCurrency,
      targetCurrency: dto.targetCurrency,
    };
  }
}
