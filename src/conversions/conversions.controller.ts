import {Controller, Get, Param, Query} from '@nestjs/common';
import {ConversionsService} from '../conversions/conversions.service';
import {ConversionRate} from '../types';

@Controller('conversions')
export class ConversionsController {
  constructor(private readonly currenciesService: ConversionsService) {}

  @Get('/:base_currency/:quote_currency')
  getCurrencies(
    @Param('base_currency') base_currency: string,
    @Param('quote_currency') quote_currency: string,
    @Query('amount') amount: number,
  ): Promise<ConversionRate> {
    return this.currenciesService.getCoversions(
      base_currency,
      quote_currency,
      amount,
    );
  }
}
