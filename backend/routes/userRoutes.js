import express from 'express';
import { getAllUsers } from '../controllers/userController.js';
import { authenticate, authorize } from '../middlewares/authMiddleware.js';
const router = express.Router();

router.get('/', authenticate, authorize(['admin']), getAllUsers);

export default router;