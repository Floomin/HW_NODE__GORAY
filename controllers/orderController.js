import { carts, orders } from '../storage.js';
import { randomUUID } from 'crypto';

export const checkout = (req, res, next) => {
  const userId = req.userId;

  const cart = carts.find((c) => c.userId === userId);
  if (!cart || cart.products.length === 0) {
    const error = new Error('Cart is empty');
    error.statusCode = 400;
    return next(error);
  }

  const totalPrice = cart.products.reduce(
    (sum, product) => sum + product.price,
    0
  );

  const newOrder = {
    id: randomUUID(),
    userId,
    products: cart.products,
    totalPrice,
  };

  orders.push(newOrder);
  carts.products = [];
  res.status(200).json(newOrder);
};
