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

const userSchema = new Schema({
  username: {
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
  emailVerificationToken: {
    type: String,
    default: null,
  },
  referralCode: {
    type: String,
    required: true,
    default: shortid.generate,
  },
});

export const User = mongoose.model('User', userSchema);
