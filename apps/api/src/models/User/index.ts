import * as mongoose from 'mongoose';
import * as shortid from 'shortid';

export enum UserRoles {
  MERCHANT = 'merchant',
  ADMIN = 'admin',
}

export enum AuthProviders {
  BASIC = 'basic',
  GOOGLE = 'google',
}

const embedType = {
  otherPayment: '/image/otherPayments.svg',
  cryptoCurrency: '/image/cryptoCurrency.svg',
};

const Schema = mongoose.Schema;
const bankAccountSchema = new Schema({
  accountNumber: {
    type: String,
    default: null,
  },
  ifscOrSwiftCode: {
    type: String,
    default: null,
  },
  cardNumber: {
    type: String,
    default: null,
  },
});

const walletSchema = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
    default: null,
  },
  address: {
    type: String,
    default: null,
  },
  mnemonic: {
    type: String,
    default: null,
  },
  privateKey: {
    type: String,
    default: null,
  },
});

const userSchema = new Schema({
  fullName: {
    type: String,
    default: null,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    default: null,
    select: false,
  },
  role: {
    type: String,
    default: UserRoles.MERCHANT,
    enum: UserRoles,
  },
  bankAccount: {
    type: bankAccountSchema,
    default: null,
  },
  authProvider: {
    type: String,
    default: AuthProviders.BASIC,
    enum: AuthProviders,
  },
  emailVerificationCode: {
    type: String,
    default: null,
  },
  referralCode: {
    type: String,
    required: true,
    default: shortid.generate,
  },
  embed: {
    type: String,
    default: embedType.otherPayment,
  },
  primaryWallet: {
    type: walletSchema,
    default: null,
  },
});

export const User = mongoose.model('User', userSchema);
