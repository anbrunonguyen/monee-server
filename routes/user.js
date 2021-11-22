import express from 'express';
import { UserModel } from '../model/user.js';

const userRoutes = express.Router();

userRoutes.post('/register', (req, res) => {
  let duplicateUser = false;
  UserModel.findOne({ username: req.body.username }, async (err, model) => {
    if (err) {
      res.status(500).send({ code: 'REGISTER_USER_ERROR', body: err });
      return;
    }
    if (model) {
      duplicateUser = true;
      console.log('user already', model);
    }
    console.log('run here first');
    if (!duplicateUser) {
      const user = new UserModel({
        username: req.body.username,
        password: req.body.password,
      });
      try {
        const savedUser = await user.save();
        res.status(201).json(savedUser);
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(422).send({ code: 'DUPLICATE_USER' });
    }
  });
});

userRoutes.post('/login', (req, res) => {
  const query = { username: req.body.username, password: req.body.password };
  UserModel.findOne(query, (err, user) => {
    if (err) {
      res.status(500).json(err);
      return;
    }
    if (user) {
      res.status(200).json({ code: 'SUCCESS', data: user });
    } else {
      res.status(422).json({ code: 'NO_ACCOUNT' });
    }
  });
});

export default userRoutes;
