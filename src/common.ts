import {Rate} from './types';

const EUR = 'EUR';

export const getConversion = async <ERService extends Record<string, any>>(
  exchangeRatesService: ERService,
  base_currency: string,
  quote_currency: string,
): Promise<Rate> => {
  let exchangeRate: Rate;
  // 1. if base currency is "EUR"
  if (base_currency === EUR) {
    exchangeRate = await exchangeRatesService.getExchangeRate(
      base_currency,
      quote_currency,
    );
    // 2. if base_currency us not "EUR"
  } else {
    // 2.1. get EUR to base_currency
    const eurToBaseCurrency = await exchangeRatesService.getExchangeRate(
      EUR,
      base_currency,
    );
    // 2.2. get EUR to quote_currency
    const eurToQuoteCurrency = await exchangeRatesService.getExchangeRate(
      EUR,
      quote_currency,
    );

    // eg: USD / AED => EUR / USD and EUR / AED
    exchangeRate = {
      base_currency,
      date: eurToBaseCurrency.date,
      quote: eurToQuoteCurrency.quote / eurToBaseCurrency.quote,
      quote_currency,
    };

    return exchangeRate;
  }
};
