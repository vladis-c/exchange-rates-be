import axios from 'axios';
import {Cache, CACHE_MANAGER} from '@nestjs/cache-manager';
import {HttpException, Inject, Injectable} from '@nestjs/common';

@Injectable()
export class CurrenciesService {
  private readonly baseUrl = process.env.SWOP_URL;
  private readonly apiKey = process.env.SWOP_API_KEY;
  private readonly currenciesEndpoint = 'currencies';

  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async getCurrencies(): Promise<string[]> {
    const cacheKey = this.currenciesEndpoint;
    const cachedCurrencies = await this.cacheManager.get<string[]>(cacheKey);
    if (cachedCurrencies) {
      return cachedCurrencies;
    }

    try {
      const {data} = await axios.get<string[]>(
        `${this.baseUrl}/${this.currenciesEndpoint}`,
        {
          headers: {Authorization: `ApiKey ${this.apiKey}`},
        },
      );
      await this.cacheManager.set(cacheKey, data, 24 * 60 * 60 * 100);
      return data;
    } catch (error) {
      throw new HttpException(
        `Failed to fetch currencies list: ${error.message}`,
        error.response?.status || 500,
      );
    }
  }
}
