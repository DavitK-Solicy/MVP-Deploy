import { GeneralResponse } from './auth';

export enum CoinType {
  BITCOIN = 'bitcoin',
  USD = 'usd',
  ETHEREUM = 'ethereum',
  LITECOIN = 'liteCoin',
}

export enum OrderStatus {
  DONE = 'done',
  PENDING = 'pending',
  FAILED = 'failed',
}

export interface OrderData {
  _id?: string;
  title?: string;
  amount?: number;
  type?: CoinType;
  status?: OrderStatus;
  orderDate?: Date;
}

export interface OrdersDataResponse extends GeneralResponse {
  data?: Array<OrderData>;
}

export interface OrderDataResponse extends GeneralResponse {
  data?: OrderData;
}
