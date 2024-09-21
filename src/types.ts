export type Rate = {
  base_currency: string;
  quote_currency: string;
  quote: number;
  /** Date in a format of 'YYYY-MM-DD' */
  date: string;
};
