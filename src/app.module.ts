import {ConfigModule} from '@nestjs/config';
import {CacheModule} from '@nestjs/cache-manager';
import {Module} from '@nestjs/common';
import {ExchangeRatesController} from './exchangeRates/exchangeRates.controller';
import {ExchangeRatesService} from './exchangeRates/exchangeRates.service';
import {CurrenciesController} from './currencies/currencies.controller';
import {CurrenciesService} from './currencies/currencies.service';
import {ConversionsController} from './conversions/conversions.controller';
import {ConversionsService} from './conversions/conversions.service';

@Module({
  imports: [ConfigModule.forRoot(), CacheModule.register()],
  controllers: [
    ExchangeRatesController,
    CurrenciesController,
    ConversionsController,
  ],
  providers: [ExchangeRatesService, CurrenciesService, ConversionsService],
})
export class AppModule {}
