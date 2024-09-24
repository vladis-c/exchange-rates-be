import {Controller, Get} from '@nestjs/common';
import {CurrenciesService} from '../currencies/currencies.service';
import {Currency} from '../types';

@Controller('currencies')
export class CurrenciesController {
  constructor(private readonly currenciesService: CurrenciesService) {}

  @Get()
  getCurrencies(): Promise<Currency[]> {
    return this.currenciesService.getCurrencies();
  }
}
