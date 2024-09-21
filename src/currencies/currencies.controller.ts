import {Controller, Get} from '@nestjs/common';
import {CurrenciesService} from '../currencies/currencies.service';

@Controller('currencies')
export class CurrenciesController {
  constructor(private readonly currenciesService: CurrenciesService) {}

  @Get()
  getCurrencies(): Promise<string[]> {
    return this.currenciesService.getCurrencies();
  }
}
