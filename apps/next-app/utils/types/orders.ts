import { GeneralResponse } from "./auth";

export interface OrderType {
  _id: string;
  title: string;
  amount: number;
  type: CoinType;
  status: OrderStatus;
  orderDate: Date;
}

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
  _id: string;
  title: string;
  amount: number;
  type: CoinType;
  status: OrderStatus;
  orderDate: Date;
}

export interface OrderDataResponse extends GeneralResponse{
  data?: Array<OrderData>;
}
