import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const User = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  fullName: { type: String, required: true },
  bio: { type: String, required: true },
  avatar: { type: String, required: true },
  createdAt: { type: String, required: true },
});

export const UserModel = mongoose.model('User', User);
