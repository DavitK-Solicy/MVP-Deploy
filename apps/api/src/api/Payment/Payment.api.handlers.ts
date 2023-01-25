import { Request, Response } from 'express';
import * as CoinGecko from 'coingecko-api';
import { coinsAbbreviation } from '../../util/helpers';
import { Coins } from '../../util/types';

// This is API for getting your wallet ballance with Dollar and with Passed coins and the current One Bitcoin price
// With the Request, query need to pass the coin or coins name as a string and your balance
export const getCurrencyBalance = async (req: Request, res: Response) => {
  try {
    const CoinGeckoClient = new CoinGecko();

    const coinTypes = String(req.query.coins);
    const currencyType = String(req.query.currencyType);
    let amount = Number(req.query.amount);

    const coinsData = coinTypes.split(',');
    if (!coinsData.includes('ethereum')) coinsData.push('ethereum');

    const coinsBases = coinsAbbreviation(coinsData);

    const data = await CoinGeckoClient.exchanges.fetchTickers('bitfinex', {
      coin_ids: coinsData,
    });

    const coinList = {};
    const coinData = data.data.tickers.filter((t) => t.target === Coins.USD);

    const ethereum = coinData.filter((t) => t.base === Coins.ETH)[0].last;
    amount *= ethereum;

    if (currencyType === Coins.USD) {
      return res.send({
        success: true,
        data: coinList,
        dollarBalance: amount,
      });
    }

    if (currencyType === Coins.BTC) {
      [Coins.BTC].forEach((item: string) => {
        const temp = coinData.filter((t) => t.base === item);
        const res = temp.length === 0 ? [] : temp[0];
        coinList[item] = amount / res.last;
      });
      return res.send({
        success: true,
        data: coinList,
        dollarBalance: amount,
      });
    }

    const bitcoin = coinData.filter((t) => t.base === Coins.BTC)[0].last;
    coinsBases.forEach((item: string) => {
      const temp = coinData.filter((t) => t.base === item);
      const res = temp.length === 0 ? [] : temp[0];
      coinList[item] = amount / res.last;
    });

    return res.send({
      success: true,
      data: coinList,
      bitcoin,
      dollarBalance: amount,
    });
  } catch (err) {
    res.json({ success: false, error: err.message });
  }
};
