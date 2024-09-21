import {Module} from '@nestjs/common';
import {ExchangeRatesController} from './app.controller';
import {ExchangeRatesService} from './app.service';

@Module({
  imports: [],
  controllers: [ExchangeRatesController],
  providers: [ExchangeRatesService],
})
export class AppModule {}
