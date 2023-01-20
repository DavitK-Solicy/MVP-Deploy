import { Router } from 'express';
import {
  requireAuth,
  requireAuthAdmin,
} from '../../middleware/auth.middleware';
import {
  createOrder,
  deleteOrder,
  getAllOrders,
  getOrderById,
  updateOrder,
} from './Order.api.handlers';

const router = Router();

router.get('/', requireAuth, getAllOrders);
router.get('/:id', requireAuth, getOrderById);
router.post('/', requireAuthAdmin, createOrder);
router.put('/:id', requireAuthAdmin, updateOrder);
router.delete('/:id', requireAuthAdmin, deleteOrder);

export default router;
