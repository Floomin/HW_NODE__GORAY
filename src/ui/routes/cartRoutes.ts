import { Router } from 'express';
import {
  addToCart,
  removeFromCart,
  getCart,
} from '../controllers/cartController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();

// Apply the auth middleware to all routes in this router
router.use(authMiddleware);

// Route to add a product to the cart
router.post('/:productId', addToCart);

// Route to remove a product from the cart
router.delete('/:productId', removeFromCart);

// Route to get the cart for the authenticated user
router.get('/', getCart);

export default router;
