import {ConfigModule} from '@nestjs/config';
import {Module} from '@nestjs/common';
import {ExchangeRatesController} from './app.controller';
import {ExchangeRatesService} from './app.service';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [ExchangeRatesController],
  providers: [ExchangeRatesService],
})
export class AppModule {}
