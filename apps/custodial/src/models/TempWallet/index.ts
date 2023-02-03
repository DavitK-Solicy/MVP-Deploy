import * as mongoose from 'mongoose';
import { getContractRPC } from "../../walletManager/getContractRPC";
import { contracts } from "../../util/constants/contracts";

const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const tempWalletSchema = new Schema({
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
  },
  parentWalletId: {
    type: ObjectId,
    ref: "Wallet",
  }
});

tempWalletSchema.pre("remove", async function (next) {
  const [usdtContract] = getContractRPC(contracts['MTK']);

  if (!usdtContract) {
    return next(new Error("Some error has occurred"));
  }

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const balance = await usdtContract.methods.balanceOf(this.address).call();
  if (BigInt(balance)) {
    return next(new Error("Child has positive balance"));
  }
  next();
});

export const TempWallet = mongoose.model('TempWallet', tempWalletSchema);
