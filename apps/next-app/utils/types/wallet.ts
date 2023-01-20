import { GeneralResponse } from './auth';

export interface WalletResponse extends GeneralResponse {
  data?: Wallet;
}

export interface Wallet {
  address: string;
  mnemonic: string;
  privateKey: string;
}

export interface CoinGeckoData {
  [key: string]: number;
}

export interface Coins {
  [key: string]: CoinItem;
}
export interface CoinItem {
  [key: string]: string;
}
