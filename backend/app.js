import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import storeRoutes from './routes/storeRoutes.js';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/stores', storeRoutes);

export default app;
