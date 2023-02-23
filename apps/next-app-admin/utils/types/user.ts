import { ReactNode } from 'react';
import { GeneralResponse } from '.';

export interface ContextProps {
  [key: string]: string | ReactNode;
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
  bankAccount: UserBankAccount;
  authProvider: AuthProviders;
  referralCode: string;
}

export interface UserResponse extends GeneralResponse {
  data?: User;
}

export interface UserAllDataResponse extends GeneralResponse {
  data?: Array<User>;
}
