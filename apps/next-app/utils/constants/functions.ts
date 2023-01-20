import moment from 'moment';
import CoinGecko from 'coingecko-api';
import { CoinGeckoData, Coins } from 'types/wallet';

export const dateFormater = (start: Date, end: Date): string => {
  const startDate = moment(start).format('DD.MM');
  const endDate = moment(end).format('DD.MM');
  return `${startDate} - ${endDate}`;
};

export const getCoinPrice = async (
  base: string,
  coinId: string
): Promise<CoinGeckoData> => {
  const CoinGeckoClient = new CoinGecko();
  const data = await CoinGeckoClient.exchanges.fetchTickers('bitfinex', {
    coin_ids: [coinId],
  });
  const coinList = {};
  const coinData = data.data.tickers.filter((t) => t.target == 'USD');

  [base].forEach((i) => {
    const temp = coinData.filter((t) => t.base == i);
    const res = temp.length == 0 ? [] : temp[0];
    coinList[i] = res.last;
  });
  return coinList;
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
