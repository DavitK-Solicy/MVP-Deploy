import { Wallet } from 'types/wallet';

export enum UserRoles {
  ADMIN = 'admin',
  MERCHANT = 'merchant',
}

export interface UserBankAccount {
  accountNumber: string;
  ifscOrSwiftCode: string;
  cardNumber: string;
}

export enum AuthProviders {
  BASIC = 'basic',
  GOOGLE = 'google',
}

export interface User {
  _id: string;
  fullName: string;
  email: string;
  role: UserRoles;
  bankAccount: UserBankAccount;
  authProvider: AuthProviders;
  primaryWalletId: Wallet;
  referralCode: string;
  embed: string;
}
