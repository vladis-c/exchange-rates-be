import {Controller, Get, Param} from '@nestjs/common';
import {ExchangeRatesService} from './exchangeRates.service';
import {Rate} from './../types';
import {getConversion} from '../common';

@Controller('rates')
export class ExchangeRatesController {
  constructor(private readonly exchangeRatesService: ExchangeRatesService) {}

  @Get()
  getExchangeRates(): Promise<Rate[]> {
    return this.exchangeRatesService.getExchangeRates();
  }

  @Get('/:base_currency/:quote_currency')
  async getExchangeRate(
    @Param('base_currency') base_currency: string,
    @Param('quote_currency') quote_currency: string,
  ): Promise<Rate> {
    return await getConversion(
      this.exchangeRatesService,
      base_currency,
      quote_currency,
    );
  }
}
