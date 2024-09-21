import {CacheModule} from '@nestjs/cache-manager';
import {Test, TestingModule} from '@nestjs/testing';
import axios from 'axios';

import {ExchangeRatesService} from '../src/app.service';

import {mockRates} from './mockRates';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('ExchangeRatesService - Single Rate', () => {
  let service: ExchangeRatesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CacheModule.register()],
      providers: [ExchangeRatesService],
    }).compile();

    service = module.get<ExchangeRatesService>(ExchangeRatesService);
  });

  const baseCurrency = 'EUR';
  const quoteCurrency = 'USD';

  it('fetches a specific exchange rate between two currencies', async () => {
    mockedAxios.get.mockResolvedValueOnce({data: mockRates[0]});
    const result = await service.getExchangeRate(baseCurrency, quoteCurrency);

    expect(result).toEqual(mockRates[0]);
    expect(mockedAxios.get).toHaveBeenCalledWith(
      `${process.env.SWOP_URL}/rates/${baseCurrency}/${quoteCurrency}`,
      {
        headers: {Authorization: `ApiKey ${process.env.SWOP_API_KEY}`},
      },
    );
  });

  it('handles API failure for a specific exchange rate between two currencies', async () => {
    mockedAxios.get.mockRejectedValueOnce(new Error('API Failed'));

    await expect(
      service.getExchangeRate(baseCurrency, quoteCurrency),
    ).rejects.toThrow('API Failed');
  });
});
