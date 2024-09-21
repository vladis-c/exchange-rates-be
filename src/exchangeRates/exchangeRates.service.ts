import axios from 'axios';
import {Cache, CACHE_MANAGER} from '@nestjs/cache-manager';
import {HttpException, Inject, Injectable} from '@nestjs/common';
import {Rate} from '../types';

@Injectable()
export class ExchangeRatesService {
  private readonly baseUrl = process.env.SWOP_URL;
  private readonly apiKey = process.env.SWOP_API_KEY;
  private readonly ratesEndpoint = 'rates';

  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async getExchangeRates(): Promise<Rate[]> {
    const cacheKey = this.ratesEndpoint;
    const cachedRates = await this.cacheManager.get<Rate[]>(cacheKey);
    if (cachedRates) {
      return cachedRates;
    }
    try {
      const {data} = await axios.get<Rate[]>(
        `${this.baseUrl}/${this.ratesEndpoint}`,
        {
          headers: {Authorization: `ApiKey ${this.apiKey}`},
        },
      );
      await this.cacheManager.set(cacheKey, data, 60 * 60 * 100);
      return data;
    } catch (error) {
      throw new HttpException(
        `Failed to get exchange rates: ${error.message}`,
        error.response?.status || 500,
      );
    }
  }

  async getExchangeRate(
    base_currency: string,
    quote_currency: string,
  ): Promise<Rate> {
    const cacheKey = `${this.ratesEndpoint}_${base_currency}_${quote_currency}`;
    const cachedRate = await this.cacheManager.get<Rate>(cacheKey);
    if (cachedRate) {
      return cachedRate;
    }
    try {
      const {data} = await axios.get<Rate>(
        `${this.baseUrl}/${this.ratesEndpoint}/${base_currency}/${quote_currency}`,
        {
          headers: {Authorization: `ApiKey ${this.apiKey}`},
        },
      );
      await this.cacheManager.set(cacheKey, data, 60 * 60 * 100);
      return data;
    } catch (error) {
      throw new HttpException(
        `Failed to fetch exchange rate for ${base_currency}/${quote_currency}: ${error.message}`,
        error.response?.status || 500,
      );
    }
  }
}
