import { Product } from './Product';

// Cart model that represents a user's shopping cart
export interface Cart {
  id: string; // Unique identifier for the cart (UUID)
  userId: string; // Identifier of the user who owns the cart
  products: Product[]; // List of products added to the cart
}
