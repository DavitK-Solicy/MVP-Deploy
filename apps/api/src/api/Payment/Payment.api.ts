import { Router } from 'express';
import { requireAuth } from '../../middleware/auth.middleware';
import { getCurrencyBalance } from './Payment.api.handlers';

const router = Router();

router.get('/convert', requireAuth, getCurrencyBalance);

export default router;
