import { CoinItem } from './types';

export const dateParser = (date: Date): number => {
  return Date.parse(date.toString());
};

export const coinsAbbreviation = (coins: Array<string>): Array<string> => {
  const data = [];
  coins.map((item: string) => {
    coinsData.map((element: CoinItem) => {
      if (item === element.coinId) data.push(element.base);
    });
  });
  return data;
};

export const coinsData: Array<CoinItem> = [
  {
    base: 'ETH',
    coinId: 'ethereum',
  },
  {
    base: 'BTC',
    coinId: 'bitcoin',
  },
  {
    base: 'USDT',
    coinId: 'tether',
  },
];
