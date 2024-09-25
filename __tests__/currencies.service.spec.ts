import {Cache, CACHE_MANAGER, CacheModule} from '@nestjs/cache-manager';
import {Test, TestingModule} from '@nestjs/testing';
import axios from 'axios';

import {mockCurrencies} from './mockData';
import {Currency} from '../src/types';
import {CurrenciesService} from '../src/currencies/currencies.service';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('CurrenciesService', () => {
  let service: CurrenciesService;
  let cacheManager: Cache;
  const cacheKey = 'currencies';

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CacheModule.register()],
      providers: [CurrenciesService],
    }).compile();

    service = module.get<CurrenciesService>(CurrenciesService);
    cacheManager = module.get<Cache>(CACHE_MANAGER);
  });

  it('fetches all exchange rates', async () => {
    mockedAxios.get.mockResolvedValueOnce({data: mockCurrencies});
    const result = await service.getCurrencies();

    expect(result).toEqual(mockCurrencies);
    expect(mockedAxios.get).toHaveBeenCalledWith(
      `${process.env.SWOP_URL}/currencies`,
      {
        headers: {Authorization: `ApiKey ${process.env.SWOP_API_KEY}`},
      },
    );

    const cachedRates = await cacheManager.get<Currency[]>(cacheKey);
    expect(cachedRates).toEqual(mockCurrencies);
  });

  it('fetches data from cache if available', async () => {
    await cacheManager.set(cacheKey, mockCurrencies);
    const result = await service.getCurrencies();
    expect(result).toEqual(mockCurrencies);
  });

  it('handles API failure for all rates', async () => {
    mockedAxios.get.mockRejectedValueOnce(new Error('API Failed'));
    await expect(service.getCurrencies()).rejects.toThrow('API Failed');

    const cachedRates = await cacheManager.get<Currency[]>(cacheKey);
    expect(cachedRates).toBeUndefined();
  });
});
