import { ExchangeRate } from '../entities/exchange-rate.entity';
import { CreateExchangeRateDto } from '../dto/create-exchange-rate.dto';

export class ExchangeRateUtil {
  static equalsToDto(rate: ExchangeRate, dto: CreateExchangeRateDto) {
    return (
      rate.sourceCurrency === dto.sourceCurrency &&
      rate.targetCurrency === dto.targetCurrency
    );
  }

  static equalsToParams(rate: ExchangeRate, source: string, target: string) {
    console.log(rate.sourceCurrency === source, rate.targetCurrency === target);
    return rate.sourceCurrency === source && rate.targetCurrency === target;
  }
}
