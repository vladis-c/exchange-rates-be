import {Controller, Get, Param} from '@nestjs/common';
import {ExchangeRatesService} from './app.service';
import {Rate} from './types';

@Controller('rates')
export class ExchangeRatesController {
  constructor(private readonly exchangeRatesService: ExchangeRatesService) {}

  @Get()
  getExchangeRates(): Rate[] {
    return this.exchangeRatesService.getExchangeRates();
  }

  @Get('/:base_currency/:quote_currency')
  getExchangeRate(
    @Param('base_currency') base_currency: string,
    @Param('quote_currency') quote_currency: string,
  ): Rate {
    return this.exchangeRatesService.getExchangeRate(
      base_currency,
      quote_currency,
    );
  }
}
