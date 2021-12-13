import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const Wallet = new Schema({
  walletId: { type: String, required: true, unique: true },
  username: { type: String, required: true },
  name: { type: String, required: true },
  type: { type: String, required: true },
  balance: { type: Number, required: true },
  income: { type: Number, required: true },
  outcome: { type: Number, required: true },
  creditLimit: { type: Number },
  creditDebt: { type: Number },
  bio: { type: String, required: true },
  createdAt: { type: String, required: true },
  tagDetail: { type: Array, required: true },
});

export const WalletModel = mongoose.model('Wallet', Wallet);
