import express from 'express';
import { checkout } from '../controllers/orderController.js';

const router = express.Router();

router.post('/cart/checkout', checkout);

export default router;
