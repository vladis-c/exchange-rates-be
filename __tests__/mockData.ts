import {Currency, Rate} from '../src/types';

export const mockRates: Rate[] = [
  {
    base_currency: 'EUR',
    quote_currency: 'USD',
    quote: 1.079301,
    date: '2020-04-04',
  },
  {
    base_currency: 'EUR',
    quote_currency: 'GBP',
    quote: 0.878173,
    date: '2020-04-04',
  },
];

export const mockCurrencies: Currency[] = [
  {
    code: 'AED',
    numeric_code: '784',
    decimal_digits: 2,
    name: 'United Arab Emirates dirham',
    active: true,
  },
  {
    code: 'USD',
    numeric_code: '840',
    decimal_digits: 2,
    name: 'United States dollar',
    active: true,
  },
  {
    code: 'EUR',
    numeric_code: '978',
    decimal_digits: 2,
    name: 'Euro',
    active: true,
  },
];
