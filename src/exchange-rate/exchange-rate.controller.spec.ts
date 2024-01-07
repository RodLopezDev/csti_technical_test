import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';

import { ExchangeRateService } from './exchange-rate.service';
import { ExchangeRate } from './entities/exchange-rate.entity';
import { EnvBootstrap, JwtConfig } from '../common/env-bootstrap';
import { ExchangeRateController } from './exchange-rate.controller';

describe('ExchangeRateController', () => {
  let controller: ExchangeRateController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot(EnvBootstrap),
        JwtModule.registerAsync(JwtConfig),
      ],
      controllers: [ExchangeRateController],
      providers: [ExchangeRateService],
    }).compile();

    controller = module.get<ExchangeRateController>(ExchangeRateController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should register a value', async () => {
    const initialValue: ExchangeRate = {
      sourceCurrency: 'PEN',
      targetCurrency: 'USD',
      rate: 0.71,
    };
    const result = controller.upsert(initialValue);
    expect(result).toBeDefined();
    expect(result?.sourceCurrency).toBe(initialValue.sourceCurrency);
    expect(result?.targetCurrency).toBe(initialValue.targetCurrency);
    expect(result?.rate).toBe(initialValue.rate);
  });

  it('should update a value', async () => {
    const initialValue = {
      sourceCurrency: 'USD',
      targetCurrency: 'PEN',
      rate: 3.66,
    };
    const resultCreated = controller.upsert(initialValue);
    expect(resultCreated).toBeDefined();
    expect(resultCreated?.sourceCurrency).toBe(initialValue.sourceCurrency);
    expect(resultCreated?.targetCurrency).toBe(initialValue.targetCurrency);
    expect(resultCreated?.rate).toBe(initialValue.rate);

    const updatedValue: ExchangeRate = {
      sourceCurrency: 'USD',
      targetCurrency: 'PEN',
      rate: 4,
    };
    const resultUpdated = controller.upsert(updatedValue);
    expect(resultUpdated).toBeDefined();
    expect(resultUpdated?.sourceCurrency).toBe(updatedValue.sourceCurrency);
    expect(resultUpdated?.targetCurrency).toBe(updatedValue.targetCurrency);
    expect(resultUpdated?.rate).toBe(updatedValue.rate);
  });

  it('should update a just a correct value', async () => {
    const initialValue = {
      sourceCurrency: 'USD',
      targetCurrency: 'PEN',
      rate: 3.66,
    };
    const initialValue2 = {
      sourceCurrency: 'USD',
      targetCurrency: 'COL',
      rate: 3.66,
    };
    controller.upsert(initialValue);
    controller.upsert(initialValue2);

    const updatedValue: ExchangeRate = {
      sourceCurrency: 'USD',
      targetCurrency: 'PEN',
      rate: 4,
    };
    const resultUpdated = controller.upsert(updatedValue);
    expect(resultUpdated).toBeDefined();
    expect(resultUpdated?.sourceCurrency).toBe(updatedValue.sourceCurrency);
    expect(resultUpdated?.targetCurrency).toBe(updatedValue.targetCurrency);
    expect(resultUpdated?.rate).toBe(updatedValue.rate);
  });

  it('should list empty', async () => {
    const result = controller.findAll();
    expect(result).toBeDefined();
    expect(result.length).toBe(0);
  });

  it('should list 1 result', async () => {
    /** REGISTER A VALUE */
    const ratePayload: ExchangeRate = {
      sourceCurrency: 'USD',
      targetCurrency: 'PEN',
      rate: 4,
    };
    controller.upsert(ratePayload);

    const result = controller.findAll();
    expect(result).toBeDefined();
    expect(result.length).toBe(1);
    expect(result?.[0].rate).toBe(ratePayload.rate);
    expect(result?.[0].sourceCurrency).toBe(ratePayload.sourceCurrency);
    expect(result?.[0].targetCurrency).toBe(ratePayload.targetCurrency);
  });
});
