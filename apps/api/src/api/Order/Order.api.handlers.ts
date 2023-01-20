import { Request, Response } from 'express';
import { Order } from '../../models/Order';

export const createOrder = async (req: Request, res: Response) => {
  try {
    const data = await Order.create({ ...req.body });

    return res.json({ success: true, data });
  } catch (err) {
    res.json({ success: false, error: err.message });
  }
};

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

export const getOrderById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const order = await Order.findById(id);
    if (!order) res.send({ success: false, error: "Order doesn't exist" });

    return res.send(order);
  } catch (err) {
    res.send({ success: false, error: err.message });
  }
};

export const updateOrder = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const order = await Order.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    return res.send({ success: true, data: order });
  } catch (err) {
    res.send({ success: false, error: err.message });
  }
};

export const deleteOrder = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await Order.deleteOne({ _id: id });

    return res.send({ success: true });
  } catch (err) {
    res.send({ success: false, error: err.message });
  }
};
