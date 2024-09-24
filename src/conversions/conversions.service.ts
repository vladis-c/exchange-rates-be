import axios from 'axios';
import {Cache, CACHE_MANAGER} from '@nestjs/cache-manager';
import {HttpException, Inject, Injectable} from '@nestjs/common';
import {ConversionRate} from '../types';

@Injectable()
export class ConversionsService {
  private readonly baseUrl = process.env.SWOP_URL;
  private readonly apiKey = process.env.SWOP_API_KEY;
  private readonly conversionsEndpoint = 'conversions';

  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async getCoversions(
    base_currency: string,
    quote_currency: string,
    amount: number,
  ): Promise<ConversionRate> {
    const cacheKey = this.conversionsEndpoint;
    const cachedCoversions =
      await this.cacheManager.get<ConversionRate>(cacheKey);
    if (cachedCoversions) {
      return cachedCoversions;
    }

    try {
      const {data} = await axios.get<ConversionRate>(
        `${this.baseUrl}/${this.conversionsEndpoint}/${base_currency}/${quote_currency}?amount=${amount}`,
        {
          headers: {Authorization: `ApiKey ${this.apiKey}`},
        },
      );
      await this.cacheManager.set(cacheKey, data, 24 * 60 * 60 * 100);
      return data;
    } catch (error) {
      throw new HttpException(
        `Failed to fetch ccoversions for ${base_currency}/${quote_currency} pair: ${error.message}`,
        error.response?.status || 500,
      );
    }
  }
}
