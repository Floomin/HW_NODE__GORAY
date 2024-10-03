import { carts, orders } from '../storage.js';
import { randomUUID } from 'crypto';

export const checkout = (req, res) => {
  const userId = req.headers['x-user-id'];

  if (!userId) {
    return res.status(401).json({ error: 'User ID is required' });
  }

  const cart = carts.find((c) => c.userId === userId);
  if (!cart || cart.products.length === 0) {
    return res.status(400).json({ error: 'Cart is empty' });
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
