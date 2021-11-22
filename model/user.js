import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const User = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
});

export const UserModel = mongoose.model('User', User);
