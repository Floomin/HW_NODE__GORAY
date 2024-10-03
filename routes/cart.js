import express from 'express';
import { addToCart, removeFromCart } from '../controllers/cartController.js';

const router = express.Router();

router.put('/:productId', addToCart);

router.delete('/:productId', removeFromCart);

export default router;
