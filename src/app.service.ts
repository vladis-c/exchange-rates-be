import {Injectable} from '@nestjs/common';
import {Rate} from './types';
import rates from './FakeDb';

@Injectable()
export class ExchangeRatesService {
  getExchangeRates(): Rate[] {
    return rates;
  }
  getExchangeRate(
    base_currency: string,
    quote_currency: string,
  ): Rate | undefined {
    const foundPair = (rates as Rate[]).find(el => {
      return (
        el.base_currency === base_currency &&
        el.quote_currency === quote_currency
      );
    });

    return foundPair;
  }
}
