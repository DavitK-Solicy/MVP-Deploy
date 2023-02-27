import { Router } from 'express';
import {
  createWallet,
  deleteWallet,
  getAllWallets,
  getWallet,
  createChildWallet,
  deleteChildWallet,
  getAllChildWallets,
  getChildWallet,
  getTransactionURL,
  transferBackToUsers,
} from './WalletManager.api.handlers';

const router = Router();

router.get('/', getAllWallets);
router.post('/', createWallet);
router.get('/:id', getWallet);
router.delete('/:id', deleteWallet);

router.get('/:id/children/', getAllChildWallets);
router.post('/:id/children/', createChildWallet);
router.get('/:id/children/:childId', getChildWallet);
router.get('/:id/children/:childId/transaction-url', getTransactionURL);
router.delete('/:id/children/:childId', deleteChildWallet);
router.get('/transfer-back/:childId',transferBackToUsers);

export default router;
