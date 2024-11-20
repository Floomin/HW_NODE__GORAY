import { Request, Response, NextFunction } from 'express';
import { CartService } from '../../application/services/CartService';
import { ProductService } from '../../application/services/ProductService';
import { Product } from '../../domain/models/Product';

const cartService = new CartService();
const productService = new ProductService();

// Add a product to the cart
export const addToCart = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { productId } = req.params;
    const userId = req.headers['x-user-id'] as string; // Get user ID from the 'x-user-id' header

    if (!userId) {
      res.status(401).json({ error: 'User ID is required' });
      return;
    }

    // Use the ProductService to find the product by ID
    const product = await productService.getProductById(productId);
    if (!product) {
      res.status(404).json({ error: 'Product not found' });
      return;
    }

    const updatedCart = await cartService.addToCart(userId, product);
    res.status(200).json(updatedCart);
  } catch (error) {
    next(error);
  }
};

// Remove a product from the cart
export const removeFromCart = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { productId } = req.params;
    const userId = req.headers['x-user-id'] as string;

    if (!userId) {
      res.status(401).json({ error: 'User ID is required' });
      return;
    }

    const updatedCart = await cartService.removeFromCart(userId, productId);
    res.status(200).json(updatedCart);
  } catch (error) {
    next(error);
  }
};

// Get the cart associated with a specific user
export const getCart = async (
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

    const cart = await cartService.getCart(userId);
    if (!cart) {
      res.status(404).json({ error: 'Cart not found' });
      return;
    }
    res.status(200).json(cart);
  } catch (error) {
    next(error);
  }
};
