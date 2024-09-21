import axios from 'axios';
import {HttpException, Injectable} from '@nestjs/common';
import {Rate} from './types';

@Injectable()
export class ExchangeRatesService {
  private readonly baseUrl = process.env.SWOP_URL;
  private readonly apiKey = process.env.SWOP_API_KEY;
  private readonly ratesEndpoint = 'rates';

  async getExchangeRates(): Promise<Rate[]> {
    try {
      const {data} = await axios.get<Rate[]>(
        `${this.baseUrl}/${this.ratesEndpoint}`,
        {
          headers: {Authorization: `ApiKey ${this.apiKey}`},
        },
      );
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
    try {
      const {data} = await axios.get<Rate>(
        `${this.baseUrl}/${this.ratesEndpoint}/${base_currency}/${quote_currency}`,
        {
          headers: {Authorization: `ApiKey ${this.apiKey}`},
        },
      );
      return data;
    } catch (error) {
      throw new HttpException(
        `Failed to fetch exchange rate for ${base_currency}/${quote_currency}: ${error.message}`,
        error.response?.status || 500,
      );
    }
  }
}
