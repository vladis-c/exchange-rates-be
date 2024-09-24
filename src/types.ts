export type Currency = {
  code: string;
  numeric_code: string;
  decimal_digits: number;
  name: string;
  active: boolean;
};

export type Rate = {
  base_currency: string;
  quote_currency: string;
  quote: number;
  /** Date in a format of 'YYYY-MM-DD' */
  date: string;
};

export type ConversionRate = Pick<
  Rate,
  'base_currency' | 'quote_currency' | 'date'
> & {
  base_amount: string;
  quote_amount: string;
};
