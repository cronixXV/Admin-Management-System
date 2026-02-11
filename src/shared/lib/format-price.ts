export const formatMoney = (value: number, currency: 'RUB' | 'USD', rate = 1) => {
  return new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency
  }).format(value * rate);
};
