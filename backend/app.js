import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import storeRoutes from './routes/storeRoutes.js';
import userRoutes from './routes/userRoutes.js'; 
import ratingRoutes from './routes/ratingRoutes.js'

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/stores', storeRoutes);
app.use('/api/users', userRoutes); 
app.use('/api/ratings', ratingRoutes);

export default app;
