import { Order } from '../models/Order';

// Interface that defines the operations for managing orders
export interface IOrderService {
  // Checkout the cart and create an order for the user
  checkout(userId: string): Promise<Order>;
}
