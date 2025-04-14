import express from 'express';
import { getStores, createStore } from '../controllers/storeController.js';
import { authenticate, authorize } from '../middlewares/authMiddleware.js';
const router = express.Router();

router.get('/', authenticate, getStores);
router.post('/', authenticate, authorize(['admin']), createStore);

export default router;
