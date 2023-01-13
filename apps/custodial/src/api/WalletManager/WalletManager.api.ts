import { Router } from 'express';
import {
  createWallet,
  deleteWallet,
  getAllWallets,
  getWallet,
} from './WalletManager.api.handlers';

const router = Router();

router.get('/', getAllWallets);
router.post('/', createWallet);
router.get('/:id', getWallet);
router.delete('/:id', deleteWallet);

export default router;
