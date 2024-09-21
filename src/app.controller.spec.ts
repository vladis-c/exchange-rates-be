import {Test, TestingModule} from '@nestjs/testing';
import {ExchangeRatesController} from './app.controller';
import {ExchangeRatesService} from './app.service';

describe('AppController', () => {
  let appController: ExchangeRatesController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ExchangeRatesController],
      providers: [ExchangeRatesService],
    }).compile();

    appController = app.get<ExchangeRatesController>(ExchangeRatesController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });
});
