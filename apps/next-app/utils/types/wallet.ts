import { GeneralResponse } from './auth';

export interface CoinsAmount {
  [key: string]: number;
}

export interface Coins {
  [key: string]: CoinItem;
}

export interface CoinItem {
  [key: string]: string;
}

export interface PaymentResponse extends GeneralResponse {
  data?: CoinsAmount;
  bitcoin?: number;
  dollarBalance?: number;
}

export interface ConvertResponse extends GeneralResponse {
  data?: CoinsAmount;
  bitcoin?: number;
}

export interface PayWithQr extends GeneralResponse {
  data?: string;
}
