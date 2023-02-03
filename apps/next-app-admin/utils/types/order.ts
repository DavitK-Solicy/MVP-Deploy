import { GeneralResponse } from '.';

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

export interface OrderResponse extends GeneralResponse {
  data?: Array<OrderData>;
}

export interface OrderUpdateResponse extends GeneralResponse {
  data?: OrderData;
}

export interface OrderData {
  _id: string;
  title: string;
  amount: number;
  type: CoinType;
  status: OrderStatus;
  orderDate: Date;
  userId: string;
}
