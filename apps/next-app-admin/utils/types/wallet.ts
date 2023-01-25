import { GeneralResponse } from '.';

export interface WalletResponse extends GeneralResponse {
  data?: Wallet;
}

export interface Wallet {
  address: string;
  mnemonic: string;
  privateKey: string;
}
