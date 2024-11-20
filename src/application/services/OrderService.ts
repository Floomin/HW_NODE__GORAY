import { IOrderService } from '../../domain/services/IOrderService';
import { Order } from '../../domain/models/Order';
import { CartRepository } from '../../infrastructure/repositories/CartRepository';
import { OrderRepository } from '../../infrastructure/repositories/OrderRepository';

// Service for managing orders
export class OrderService implements IOrderService {
  private cartRepository: CartRepository;
  private orderRepository: OrderRepository;

  constructor() {
    this.cartRepository = new CartRepository();
    this.orderRepository = new OrderRepository();
  }

  // Checkout the cart and create an order for the user
  public async checkout(userId: string): Promise<Order> {
    const cart = await this.cartRepository.getByUserId(userId);

    if (!cart || cart.products.length === 0) {
      throw new Error('Cart is empty');
    }

    // Calculate the total price of the order
    const totalPrice = cart.products.reduce(
      (sum, product) => sum + product.price,
      0,
    );

    const newOrder: Order = {
      id: 'order-' + userId,
      userId,
      products: cart.products,
      totalPrice,
    };

    // Save the order and clear the cart
    await this.cartRepository.clearCart(userId);
    return await this.orderRepository.save(newOrder);
  }
}
