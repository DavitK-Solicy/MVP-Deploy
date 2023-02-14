import { Router } from 'express';
import { requireAuth } from '../../middleware/auth.middleware';
import {
  convertUsdToCoin,
  getCurrencyBalance,
  payWithQr,
} from './Payment.api.handlers';

const router = Router();

router.get('/convert', requireAuth, getCurrencyBalance);
router.get('/convert-coin', requireAuth, convertUsdToCoin);
router.get('/pay-with-qr', payWithQr);

export default router;
