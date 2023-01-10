import { Request, Response } from 'express';
import { Order } from '../../models/Orders';

export const getAllOrders = async (req: Request, res: Response) => {
  try {
    const limit = Number(req.query.limit);
    const offset = Number(req.query.offset);

    const count = await Order.collection.countDocuments();
    const data = await Order.find()
      .skip(offset)
      .populate('sender')
      .limit(limit);

    return res.send({ success: true, data, count });
  } catch (err) {
    res.send({ success: false, error: err.message });
  }
};
