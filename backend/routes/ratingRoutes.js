import express from 'express';
import { rateStore } from '../controllers/ratingController.js';
import { authenticate, authorize } from '../middlewares/authMiddleware.js';
const router = express.Router();

router.post('/', authenticate, authorize(['user']), rateStore);

export default router;
