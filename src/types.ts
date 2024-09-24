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

export type ConversionRate = Rate & {
  base_amount: number;
  quote_amount: number;
  opposite_quote: number;
};
