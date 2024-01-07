export const CurrencyFormat = (value: number | string) =>
  Number(Number(value).toFixed(2));
