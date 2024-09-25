import {Cache, CACHE_MANAGER, CacheModule} from '@nestjs/cache-manager';
import {Test, TestingModule} from '@nestjs/testing';
import axios from 'axios';

import {ExchangeRatesService} from '../src/exchangeRates/exchangeRates.service';
import {mockRates} from './mockData';
import {Rate} from '../src/types';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('ExchangeRatesService', () => {
  let service: ExchangeRatesService;
  let cacheManager: Cache;
  const cacheKey = 'rates';

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CacheModule.register()],
      providers: [ExchangeRatesService],
    }).compile();

    service = module.get<ExchangeRatesService>(ExchangeRatesService);
    cacheManager = module.get<Cache>(CACHE_MANAGER);
  });

  it('fetches all exchange rates', async () => {
    mockedAxios.get.mockResolvedValueOnce({data: mockRates});
    const result = await service.getExchangeRates();

    expect(result).toEqual(mockRates);
    expect(mockedAxios.get).toHaveBeenCalledWith(
      `${process.env.SWOP_URL}/rates`,
      {
        headers: {Authorization: `ApiKey ${process.env.SWOP_API_KEY}`},
      },
    );

    const cachedRates = await cacheManager.get<Rate[]>(cacheKey);
    expect(cachedRates).toEqual(mockRates);
  });

  it('fetches data from cache if available', async () => {
    await cacheManager.set(cacheKey, mockRates);
    const result = await service.getExchangeRates();
    expect(result).toEqual(mockRates);
  });

  it('handles API failure for all rates', async () => {
    mockedAxios.get.mockRejectedValueOnce(new Error('API Failed'));
    await expect(service.getExchangeRates()).rejects.toThrow('API Failed');

    const cachedRates = await cacheManager.get<Rate[]>(cacheKey);
    expect(cachedRates).toBeUndefined();
  });
});
