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
  ETHERIUM = 'etherium',
  LITECOIN = 'litecoin',
}

export enum OrderStatus {
  DONE = 'Done',
  PENDING = 'Pending',
  FAILED = 'Failed',
}


