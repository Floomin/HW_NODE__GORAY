import { carts, products } from '../storage.js';
import { randomUUID } from 'crypto';

// Controller for adding a product to the cart
export const addToCart = (req, res, next) => {
  const { productId } = req.params;
  const userId = req.userId;

  const product = products.find((p) => p.id === parseInt(productId, 10));
  if (!product) {
    const error = new Error('Product not found');
    error.statusCode = 404;
    return next(error);
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

export const removeFromCart = (req, res, next) => {
  const { productId } = req.params;
  const userId = req.userId;

  const cart = carts.find((c) => c.userId === userId);
  if (!cart) {
    const error = new Error('Cart not found');
    error.statusCode = 404;
    return next(error);
  }

  cart.products = cart.products.filter((p) => p.id !== parseInt(productId, 10));
  res.status(200).json(cart);
};
