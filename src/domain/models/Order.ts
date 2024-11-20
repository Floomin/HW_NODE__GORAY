import { Product } from './Product';

// Order model that represents an order made by a user
export interface Order {
  id: string; // Unique identifier for the order (UUID)
  userId: string; // Identifier of the user who placed the order
  products: Product[]; // List of products in the order
  totalPrice: number; // Total price of the order
}
