import express from 'express';
import { rateStore, getAllRatings } from '../controllers/ratingController.js';
import { authenticate, authorize } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/', authenticate, authorize(['user']), rateStore);
router.get('/', authenticate, authorize(['admin']), getAllRatings); // <-- Add this line

export default router;

