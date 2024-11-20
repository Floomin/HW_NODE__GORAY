import { Cart } from '../models/Cart';
import { Product } from '../models/Product';

// Interface that defines the operations for managing shopping carts
export interface ICartService {
  // Add a product to the user's cart
  addToCart(userId: string, product: Product): Promise<Cart>;

  // Remove a product from the user's cart
  removeFromCart(userId: string, productId: string): Promise<Cart>;

  // Get the cart associated with a specific user
  getCart(userId: string): Promise<Cart | null>;
}
