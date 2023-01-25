import moment from 'moment';
import { Coins } from 'types/wallet';

export const dateFormatter = (start: Date, end: Date): string => {
  const startDate = moment(start).format('DD.MM');
  const endDate = moment(end).format('DD.MM');
  return `${startDate} - ${endDate}`;
};

export const coins: Coins = {
  ethereum: {
    base: 'ETH',
    coinId: 'ethereum',
  },
  bitcoin: {
    base: 'BTC',
    coinId: 'bitcoin',
  },
};
