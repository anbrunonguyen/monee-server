import express from 'express';
import { WalletModel } from '../model/wallet.js';

const walletRoutes = express.Router();

walletRoutes.post('/create', (req, res) => {
  let duplicateWallet = false;
  WalletModel.findOne({ walletId: req.body.walletId }, async (err, model) => {
    if (err) {
      res.status(500).send({ code: 'CREATE_WALLET_ERROR', body: err });
      return;
    }
    if (model) {
      duplicateWallet = true;
    }
    if (!duplicateWallet) {
      const wallet = new WalletModel({
        walletId: req.body.walletId,
        username: req.body.username,
        name: req.body.name,
        type: req.body.type,
        balance: req.body.balance,
        income: req.body.income || 0,
        outcome: req.body.outcome || 0,
        creditLimit: req.body.creditLimit || 0,
        creditDebt: req.body.creditDebt || 0,
        bio: req.body.bio,
        createdAt: new Date().toString(),
        tagDetail: req.body.tagDetail,
      });
      try {
        const savedWallet = await wallet.save();
        res.status(200).json({ code: 'SUCCESS', data: savedWallet });
      } catch (err) {
        res.status(500).json({ code: 'CREATE_WALLET_ERROR', body: err });
      }
    } else {
      res.status(422).send({ code: 'DUPLICATE_WALLET' });
    }
  });
});

export default walletRoutes;
