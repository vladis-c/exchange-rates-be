import {Controller, Get, Param, Query} from '@nestjs/common';
import {ConversionRate} from '../types';
import {ExchangeRatesService} from '../exchangeRates/exchangeRates.service';
import {getConversion} from '../common';

@Controller('conversions')
export class ConversionsController {
  constructor(private readonly exchangeRatesService: ExchangeRatesService) {}

  @Get('/:base_currency/:quote_currency')
  async getCurrencies(
    @Param('base_currency') base_currency: string,
    @Param('quote_currency') quote_currency: string,
    @Query('amount') amount: number,
  ): Promise<ConversionRate> {
    const exchangeRate = await getConversion(
      this.exchangeRatesService,
      base_currency,
      quote_currency,
    );
    const conversionRate: ConversionRate = {
      ...exchangeRate,
      base_amount: +amount,
      quote_amount: exchangeRate.quote * amount,
      opposite_quote: +(1 / exchangeRate.quote).toFixed(6),
    };
    return new Promise<ConversionRate>(res => res(conversionRate));
  }
}
