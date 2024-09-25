import {Controller, Get, Param, Query} from '@nestjs/common';
import {ConversionRate, Rate} from '../types';
import {ExchangeRatesService} from '../exchangeRates/exchangeRates.service';

const EUR = 'EUR';

@Controller('conversions')
export class ConversionsController {
  constructor(private readonly exchangeRatesService: ExchangeRatesService) {}

  @Get('/:base_currency/:quote_currency')
  async getCurrencies(
    @Param('base_currency') base_currency: string,
    @Param('quote_currency') quote_currency: string,
    @Query('amount') amount: number,
  ): Promise<ConversionRate> {
    let exchangeRate: Rate;
    // 1. if base currency is "EUR"
    if (base_currency === EUR) {
      exchangeRate = await this.exchangeRatesService.getExchangeRate(
        base_currency,
        quote_currency,
      );
      // 2. if base_currency us not "EUR"
    } else {
      // 2.1. get EUR to base_currency
      const eurToBaseCurrency = await this.exchangeRatesService.getExchangeRate(
        EUR,
        base_currency,
      );
      // 2.2. get EUR to quote_currency
      const eurToQuoteCurrency =
        await this.exchangeRatesService.getExchangeRate(EUR, quote_currency);

      // eg: USD / AED => EUR / USD and EUR / AED
      exchangeRate = {
        base_currency,
        date: eurToBaseCurrency.date,
        quote: eurToQuoteCurrency.quote / eurToBaseCurrency.quote,
        quote_currency,
      };
    }

    const conversionRate: ConversionRate = {
      ...exchangeRate,
      base_amount: +amount,
      quote_amount: exchangeRate.quote * amount,
      opposite_quote: +(1 / exchangeRate.quote).toFixed(6),
    };
    return new Promise<ConversionRate>(res => res(conversionRate));
  }
}
