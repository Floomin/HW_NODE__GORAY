import express, { Application } from 'express';
import productRoutes from './ui/routes/productRoutes';
import cartRoutes from './ui/routes/cartRoutes';
import orderRoutes from './ui/routes/orderRoutes';
import userRoutes from './ui/routes/userRoutes';
import { errorHandler } from './ui/middleware/errorMiddleware';
import dotenv from 'dotenv';

dotenv.config();

const app: Application = express();

app.use(express.json());

app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/users', userRoutes);

app.use(errorHandler);

export default app;
