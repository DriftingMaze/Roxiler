import express from 'express';
import { getStores, createStore, getStoreByOwner } from '../controllers/storeController.js';
import { authenticate, authorize } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/', authenticate, getStores);

router.post('/', authenticate, authorize(['admin']), createStore);

router.get('/owner', authenticate, authorize(['owner']), getStoreByOwner);

export default router;
