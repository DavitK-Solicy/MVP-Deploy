import { Router } from 'express';
import { requireAuth } from '../../middleware/auth.middleware';
import { sendInvoice } from './Invoice.api.handlers';

const router = Router();

router.post('/', requireAuth, sendInvoice);

export default router;
