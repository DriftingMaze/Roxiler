import express from 'express';
import { getAllUsers, createUser } from '../controllers/userController.js';
import { authenticate, authorize } from '../middlewares/authMiddleware.js';
const router = express.Router();

router.get('/', authenticate, authorize(['admin']), getAllUsers);
router.post('/', authenticate, authorize(['admin']), createUser); // Add this line

export default router;
