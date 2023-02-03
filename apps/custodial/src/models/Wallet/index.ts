import * as mongoose from 'mongoose';
import {TempWallet} from "../TempWallet";

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
  createdAt: {
    type: Date,
    required: false,
    default: Date.now,
  }
});

walletSchema.pre("remove", function(next) {
  TempWallet.countDocuments({ parentWalletId: this._id }, (error, count) => {
    if (error) return next(error);
    if (count > 0) {
      return next(new Error("Can't delete parent with existing child"));
    }
    next();
  });
});

export const Wallet = mongoose.model('Wallet', walletSchema);
