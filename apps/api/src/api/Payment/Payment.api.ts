import { Router } from 'express';
import { requireAuth } from '../../middleware/auth.middleware';
import {
  convertUsdToCoin,
  getCurrencyBalance,
  payWithQr,
  transferBackToUsers,
} from './Payment.api.handlers';

const router = Router();

router.get('/convert', requireAuth, getCurrencyBalance);
router.get('/convert-coin', requireAuth, convertUsdToCoin);
router.get('/pay-with-qr', payWithQr);
router.get('/transfer-back-to-users/:childId', transferBackToUsers);

export default router;
