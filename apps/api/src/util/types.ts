export interface CoinItem {
  base: string;
  coinId: string;
}

export enum Coins {
  BTC = 'BTC',
  ETH = 'ETH',
  USDT = 'USDT',
  USD = 'USD',
}

export interface MerchantWallets {
  childId: string;
  parentId: string;
  orderAmount: number;
}
