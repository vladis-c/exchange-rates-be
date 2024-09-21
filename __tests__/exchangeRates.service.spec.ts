import {CacheModule} from '@nestjs/cache-manager';
import {Test, TestingModule} from '@nestjs/testing';
import axios from 'axios';

import {ExchangeRatesService} from '../src/app.service';
import {mockRates} from './mockRates';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('ExchangeRatesService', () => {
  let service: ExchangeRatesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CacheModule.register()],
      providers: [ExchangeRatesService],
    }).compile();

    service = module.get<ExchangeRatesService>(ExchangeRatesService);
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
  });

  it('handles API failure for all rates', async () => {
    mockedAxios.get.mockRejectedValueOnce(new Error('API Failed'));

    await expect(service.getExchangeRates()).rejects.toThrow('API Failed');
  });
});
