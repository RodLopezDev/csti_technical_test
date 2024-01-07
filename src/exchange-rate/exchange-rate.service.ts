import { Injectable } from '@nestjs/common';

import { ExchangeRateUtil } from './utils/exchange-rate';
import { ExchangeRate } from './entities/exchange-rate.entity';
import { CreateExchangeRateDto } from './dto/create-exchange-rate.dto';

@Injectable()
export class ExchangeRateService {
  private exchanges: ExchangeRate[] = [];

  create(dto: CreateExchangeRateDto): ExchangeRate {
    this.exchanges.push(dto);
    return dto;
  }

  findAll() {
    return this.exchanges;
  }

  findOne(source: string, target: string): ExchangeRate | undefined {
    return this.exchanges.find((e) =>
      ExchangeRateUtil.equalsToParams(e, source, target),
    );
  }

  update(dto: CreateExchangeRateDto): ExchangeRate {
    this.exchanges = this.exchanges.map((e) =>
      ExchangeRateUtil.equalsToDto(e, dto) ? dto : e,
    );
    return dto;
  }

  cleanUp() {
    this.exchanges = [];
    return true;
  }
}
