import * as assert from 'assert';
import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import { AppModule } from './../src/app.module';
import { ExchangeRateUtil } from './../src/exchange-rate/utils/exchange-rate';

const EXAMPLE_EXCHANGE_RATE = {
  sourceCurrency: 'PEN',
  targetCurrency: 'USD',
  rate: 0.48,
};

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let token = '';

  async function populate() {
    await request(app.getHttpServer())
      .post('/exchange-rate')
      .send(EXAMPLE_EXCHANGE_RATE)
      .set('Authorization', `Bearer ${token}`)
      .expect(201);
  }

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/auth/login (POST)', async () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send({ user: 'MY_USER', password: 'demo-nest-pwd-ex' })
      .expect(201)
      .then((response) => {
        assert.equal(response.text.indexOf('ey'), 0);
        token = response.text;
      });
  });

  it('/exchange-rate (POST) Failure', async () => {
    return request(app.getHttpServer())
      .post('/exchange-rate')
      .expect(401)
      .then((response) => {
        const json = JSON.parse(response.text);
        assert.equal(json.message, 'Unauthorized');
      });
  });

  it('/exchange-rate (POST)', async () => {
    return request(app.getHttpServer())
      .post('/exchange-rate')
      .send(EXAMPLE_EXCHANGE_RATE)
      .set('Authorization', `Bearer ${token}`)
      .expect(201)
      .then((response) => {
        const json = JSON.parse(response.text);
        assert.equal(json.sourceCurrency, EXAMPLE_EXCHANGE_RATE.sourceCurrency);
        assert.equal(json.targetCurrency, EXAMPLE_EXCHANGE_RATE.targetCurrency);
        assert.equal(json.rate, EXAMPLE_EXCHANGE_RATE.rate);
      });
  });

  it('/exchange-rate (GET)', async () => {
    return request(app.getHttpServer())
      .get('/exchange-rate')
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .then((response) => {
        const json = JSON.parse(response.text) as any[];
        assert.equal(json.length, 0);
      });
  });

  it('/exchange-rate (GET) With Data registered', async () => {
    await populate();
    return request(app.getHttpServer())
      .get('/exchange-rate')
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .then((response) => {
        const json = JSON.parse(response.text) as any[];
        assert.notEqual(json.length, 0);

        const example_rate = json.find((e) =>
          ExchangeRateUtil.equalsToParams(
            EXAMPLE_EXCHANGE_RATE,
            e.sourceCurrency,
            e.targetCurrency,
          ),
        );
        assert.equal(
          example_rate.sourceCurrency,
          EXAMPLE_EXCHANGE_RATE.sourceCurrency,
        );
        assert.equal(
          example_rate.targetCurrency,
          EXAMPLE_EXCHANGE_RATE.targetCurrency,
        );
        assert.equal(example_rate.rate, EXAMPLE_EXCHANGE_RATE.rate);
      });
  });

  it('/exchange (POST)', async () => {
    return request(app.getHttpServer())
      .post('/exchange')
      .set('Authorization', `Bearer ${token}`)
      .expect(404)
      .then((response) => {
        const json = JSON.parse(response.text);
        assert.equal(json.message, 'EXCHANGE_RATE_NOT_FOUND');
      });
  });

  it('/exchange (POST) with data', async () => {
    await populate();
    const amount = 467;
    return request(app.getHttpServer())
      .post('/exchange')
      .set('Authorization', `Bearer ${token}`)
      .send({
        amount,
        sourceCurrency: EXAMPLE_EXCHANGE_RATE.sourceCurrency,
        targetCurrency: EXAMPLE_EXCHANGE_RATE.targetCurrency,
      })
      .expect(200)
      .then((response) => {
        const json = JSON.parse(response.text) as any;
        assert.equal(json.amount, amount);
        assert.equal(json.exchangedAmount, EXAMPLE_EXCHANGE_RATE.rate * amount);
        assert.equal(json.exchangeRate, EXAMPLE_EXCHANGE_RATE.rate);
        assert.equal(json.sourceCurrency, EXAMPLE_EXCHANGE_RATE.sourceCurrency);
        assert.equal(json.targetCurrency, EXAMPLE_EXCHANGE_RATE.targetCurrency);
      });
  });
});
