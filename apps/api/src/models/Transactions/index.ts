import * as mongoose from 'mongoose';
import { dateParser } from '../../util/helpers';

const Schema = mongoose.Schema;

const currentDate = dateParser(new Date());

const transactionSchema = new Schema({
  hash: {
    type: String,
    required: true,
  },
  sender: {
    type: String,
    required: true,
  },
  receiver: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: currentDate,
  },
});

export const Transaction = mongoose.model('Transaction', transactionSchema);
