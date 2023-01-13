import { Request, Response } from 'express';
import {Wallet} from "../../models/Wallet";
import generateAndStoreWallet from "../../walletManager/entities/createWallet";

export const getAllWallets = async (req: Request, res: Response) => {
  try {
    const limit = Number(req.query.limit);
    const offset = Number(req.query.offset);

    const walletsCount = await Wallet.collection.countDocuments();
    const wallets = await Wallet.find().skip(offset).limit(limit);

    return res.send({ wallets, count: walletsCount });
  } catch (err) {
    res.status(404);
    res.send({ success: false, error: err });
  }
};

export const createWallet = async (req: Request, res: Response) => {
  try {
    const wallet = await generateAndStoreWallet();
    return res.json({ success: true, data: wallet });
  } catch (err) {
    res.status(404);
    res.send({ success: false, error: err });
  }
};

export const getWallet = async (req: Request, res: Response) => {
  try {
    const {id} = req.params;
    const wallet = await Wallet.findById(id);
    return res.send(wallet);
  } catch (err) {
    res.send({success: false, error: err});
  }
};

export const deleteWallet = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await Wallet.deleteOne({ _id: id });
    return res.send({ success: true });
  } catch (err) {
    res.status(404);
    res.send({ success: false, error: err });
  }
};
