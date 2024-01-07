import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Controller, Get, Post, Body, UseGuards, Delete } from '@nestjs/common';

import { AuthGuard } from '../auth/strategy/auth.guard';
import { ExchangeRateService } from './exchange-rate.service';
import { CreateExchangeRateDto } from './dto/create-exchange-rate.dto';

@ApiBearerAuth()
@UseGuards(AuthGuard)
@ApiTags('Exchange Rate')
@Controller('exchange-rate')
export class ExchangeRateController {
  constructor(private readonly exchangeRateService: ExchangeRateService) {}

  @Post()
  upsert(@Body() dto: CreateExchangeRateDto) {
    if (
      this.exchangeRateService.findOne(dto.sourceCurrency, dto.targetCurrency)
    ) {
      return this.exchangeRateService.update(dto);
    }
    return this.exchangeRateService.create(dto);
  }

  @Get()
  findAll() {
    return this.exchangeRateService.findAll();
  }

  @Delete()
  cleanUp() {
    return this.exchangeRateService.cleanUp();
  }
}
