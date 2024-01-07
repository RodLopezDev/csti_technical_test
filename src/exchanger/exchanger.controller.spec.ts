import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';

import { ExchangerController } from './exchanger.controller';
import { EnvBootstrap, JwtConfig } from '../common/env-bootstrap';
import { ExchangeRateModule } from '../exchange-rate/exchange-rate.module';
import { ExchangeRateService } from '../exchange-rate/exchange-rate.service';

describe('ExchangerController', () => {
  let controller: ExchangerController;
  let exchangeRateService: ExchangeRateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot(EnvBootstrap),
        JwtModule.registerAsync(JwtConfig),
        ExchangeRateModule,
      ],
      controllers: [ExchangerController],
      providers: [],
    }).compile();

    controller = module.get<ExchangerController>(ExchangerController);
    exchangeRateService = module.get<ExchangeRateService>(ExchangeRateService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should fail with 404', async () => {
    const payload = {
      amount: 1,
      sourceCurrency: 'USD',
      targetCurrency: 'PEN',
    };
    try {
      controller.exchange(payload);
    } catch (e) {
      expect(e?.message).toBe('EXCHANGE_RATE_NOT_FOUND');
    }
  });

  it('should fail with 404', async () => {
    const payload = {
      amount: 12,
      sourceCurrency: 'USD',
      targetCurrency: 'PEN',
    };
    const rateExample = {
      rate: 10,
      sourceCurrency: 'USD',
      targetCurrency: 'PEN',
    };

    jest.spyOn(exchangeRateService, 'findOne').mockReturnValueOnce(rateExample);

    const result = controller.exchange(payload);
    expect(result.amount).toBe(payload.amount);
    expect(result.exchangeRate).toBe(rateExample.rate);
    expect(result.exchangedAmount).toBe(rateExample.rate * payload.amount);
  });
});
