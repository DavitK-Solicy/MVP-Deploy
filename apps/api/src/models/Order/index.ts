import * as mongoose from 'mongoose';
import { dateParser } from '../../util/helpers';

export enum CoinType {
  BITCOIN = 'bitcoin',
  USD = 'usd',
  ETHEREUM = 'ethereum',
  LITECOIN = 'liteCoin',
}

export enum OrderStatus {
  DONE = 'done',
  PENDING = 'pending',
  FAILED = 'failed',
}

const Schema = mongoose.Schema;

const currentDate = dateParser(new Date());
const orderSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: CoinType,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: OrderStatus,
    required: true,
  },
  orderDate: {
    type: Date,
    default: currentDate,
  },
});

export const Order = mongoose.model('Order', orderSchema);
