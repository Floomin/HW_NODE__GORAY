import { carts, products } from '../storage.js';
import { randomUUID } from 'crypto';

export const addToCart = (req, res) => {
  const { productId } = req.params;
  const userId = req.headers['x-user-id'];

  if (!userId) {
    return res.status(401).json({ error: 'User ID is required' });
  }

  const product = products.find((p) => p.id === parseInt(productId, 10));
  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }

  let cart = carts.find((c) => c.userId === userId);
  if (!cart) {
    cart = {
      id: randomUUID(),
      userId,
      products: [],
    };
    carts.push(cart);
  }

  cart.products.push(product);
  res.status(200).json(cart);
};

export const removeFromCart = (req, res) => {
  const { productId } = req.params;
  const userId = req.headers['x-user-id'];

  if (!userId) {
    return res.status(401).json({ error: 'User ID is required' });
  }

  const cart = carts.find((c) => c.userId === userId);
  if (!cart) {
    return res.status(404).json({ error: 'Cart not found' });
  }

  cart.products = cart.products.filter((p) => p.id !== parseInt(productId, 10));

  res.status(200).json(cart);
};
