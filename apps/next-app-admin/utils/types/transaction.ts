import { GeneralResponse } from '.';

export interface TransactionResponse extends GeneralResponse {
  data: TransactionData;
}

export interface TransactionData {
  hash: string;
  receiver: string;
  sender: string;
}
