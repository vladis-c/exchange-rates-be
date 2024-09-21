import {ConfigModule} from '@nestjs/config';
import {CacheModule} from '@nestjs/cache-manager';
import {Module} from '@nestjs/common';
import {ExchangeRatesController} from './app.controller';
import {ExchangeRatesService} from './app.service';

@Module({
  imports: [ConfigModule.forRoot(), CacheModule.register()],
  controllers: [ExchangeRatesController],
  providers: [ExchangeRatesService],
})
export class AppModule {}
