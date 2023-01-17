import { UserRoles } from 'utils/constants/userRoles';

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
  referralCode: string;
}
