import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

const walletSchema = new Schema({
  address: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
    trim: true,
  },
  mnemonic: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
    trim: true,
  },
  privateKey: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
    trim: true,
  },
});

export const Wallet = mongoose.model('Wallet', walletSchema);
