import {Cache, CACHE_MANAGER, CacheModule} from '@nestjs/cache-manager';
import {Test, TestingModule} from '@nestjs/testing';
import axios from 'axios';

import {ExchangeRatesService} from '../src/app.service';
import {Rate} from '../src/types';
import {mockRates} from './mockRates';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('ExchangeRatesService - Single Rate', () => {
  let service: ExchangeRatesService;
  let cacheManager: Cache;
  const baseCurrency = 'EUR';
  const quoteCurrency = 'USD';
  const cacheKey = `rates_${baseCurrency}_${quoteCurrency}`;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CacheModule.register()],
      providers: [ExchangeRatesService],
    }).compile();

    service = module.get<ExchangeRatesService>(ExchangeRatesService);
    cacheManager = module.get<Cache>(CACHE_MANAGER);
  });

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

  it('fetches data for exchange pairs from cache if available', async () => {
    await cacheManager.set(cacheKey, mockRates[0]);
    const result = await service.getExchangeRate(baseCurrency, quoteCurrency);
    expect(result).toEqual(mockRates[0]);
  });

  it('handles API failure for a specific exchange rate between two currencies', async () => {
    mockedAxios.get.mockRejectedValueOnce(new Error('API Failed'));

    await expect(
      service.getExchangeRate(baseCurrency, quoteCurrency),
    ).rejects.toThrow('API Failed');

    const cachedRates = await cacheManager.get<Rate>(cacheKey);
    expect(cachedRates).toBeUndefined();
  });
});
