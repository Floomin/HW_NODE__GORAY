import { Request, Response, NextFunction } from 'express';
import { OrderService } from '../../application/services/OrderService';

const orderService = new OrderService();

// Checkout the cart and create an order for the user
export const checkout = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const userId = req.userId;

    if (!userId) {
      res.status(401).json({ error: 'User ID is required' });
      return;
    }

    // Perform the checkout operation using the OrderService
    const order = await orderService.checkout(userId);
    res.status(201).json(order);
  } catch (error) {
    next(error); // Pass the error to the error-handling middleware
  }
};
