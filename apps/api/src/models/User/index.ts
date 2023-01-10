import * as mongoose from 'mongoose';
import * as shortid from 'shortid';

export enum UserRoles {
  BASIC = 'basic',
  ADMIN = 'admin',
}

export enum AuthProviders {
  BASIC = 'basic',
  TWITTER = 'twitter',
  GOOGLE = 'google',
}

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    default: null,
  },
  surname: {
    type: String,
    default: null,
  },
  country: {
    type: String,
    default: null,
  },
  nationality: {
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
    default: UserRoles.BASIC,
    enum: UserRoles,
  },
  authProvider: {
    type: String,
    default: AuthProviders.BASIC,
    enum: AuthProviders,
  },
  walletAddresses: {
    type: [String],
    default: null,
  },
  emailVerificationToken: {
    type: String,
    default: null,
  },
  twitterId: {
    type: String,
    default: null,
  },
  primaryWalletAddress: {
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
