import { Router } from 'express';
import { checkout } from '../controllers/orderController';
import { authMiddleware } from '../middleware/authMiddleware';

const router: Router = Router();

router.post('/checkout', authMiddleware, checkout);

export default router;
