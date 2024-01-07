import { Test, TestingModule } from '@nestjs/testing';
import { ExchangerController } from './exchanger.controller';

describe('ExchangerController', () => {
  let controller: ExchangerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExchangerController],
      providers: [],
    }).compile();

    controller = module.get<ExchangerController>(ExchangerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
