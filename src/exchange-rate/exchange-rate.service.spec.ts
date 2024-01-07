import { Test, TestingModule } from '@nestjs/testing';
import { ExchangeRateService } from './exchange-rate.service';

describe('ExchangeRateService', () => {
  let service: ExchangeRateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExchangeRateService],
    }).compile();

    service = module.get<ExchangeRateService>(ExchangeRateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be validate all methods', () => {
    const payload = {
      rate: 1,
      sourceCurrency: 'PEN',
      targetCurrency: 'USD',
    };

    const firstLoad = service.findAll();
    expect(firstLoad.length).toBe(0);

    const result = service.create(payload);
    expect(result.rate).toBe(payload.rate);
    expect(result.sourceCurrency).toBe(payload.sourceCurrency);
    expect(result.targetCurrency).toBe(payload.targetCurrency);

    const secondLoad = service.findAll();
    expect(secondLoad.length).toBe(1);

    const result2 = service.update({ ...payload, rate: 20 });
    expect(result2.rate).toBe(20);
    expect(result2.sourceCurrency).toBe(payload.sourceCurrency);
    expect(result2.targetCurrency).toBe(payload.targetCurrency);

    const result3 = service.cleanUp();
    expect(result3).toBeTruthy();

    const thirdLoad = service.findAll();
    expect(thirdLoad.length).toBe(0);
  });
});
