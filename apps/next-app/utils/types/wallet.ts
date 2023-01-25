import { GeneralResponse } from './auth';

export interface WalletResponse extends GeneralResponse {
  data?: Wallet;
}

export interface Wallet {
  address: string;
  mnemonic: string;
  privateKey: string;
}

export interface CoinsAmount {
  [key: string]: number;
}

export interface Coins {
  [key: string]: CoinItem;
}

export interface CoinItem {
  [key: string]: string;
}

export interface PaymentResponse {
  success: boolean;
  message?: string;
  data?: CoinsAmount;
  bitcoin?: number;
  dollarBalance?: number;
}
