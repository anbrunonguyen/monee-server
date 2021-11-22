import express from 'express';
import { UserModel } from '../model/user.js';

const userRoutes = express.Router();

userRoutes.post('/register', async (req, res) => {
  console.log(req.body);
  let duplicateUser = false;
  UserModel.findOne({ username: req.body.username }, (err, model) => {
    if (model) {
      duplicateUser = true;
    }
  });
  if (duplicateUser) {
    const user = new UserModel({
      username: req.body.username,
      password: req.body.password,
    });
    try {
      const savedUser = await user.save();
      res.json(savedUser);
    } catch (err) {
      res.json(err);
    }
  } else {
    res.send({ code: 'DUPLICATE_USER' });
  }
});

userRoutes.post('/login', (req, res) => {
  const query = { username: req.body.username, password: req.body.password };
  UserModel.findOne(query, (err, user) => {
    if (err) {
      res.json(err);
      return;
    }
    if (user) {
      res.json({ code: 'SUCCESS', data: user });
    } else {
      res.json({ code: 'NO_ACCOUNT' });
    }
  });
});

export default userRoutes;
