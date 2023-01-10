import { Router } from 'express';
import { requireAuth,  } from '../../middleware/auth.middleware';
import { getAllOrders } from './Orders.api.handlers';

const router = Router();

router.get('/', requireAuth, getAllOrders);

export default router;
