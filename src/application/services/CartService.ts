import { ICartService } from '../../domain/services/ICartService';
import { Cart } from '../../domain/models/Cart';
import { Product } from '../../domain/models/Product';
import { CartRepository } from '../../infrastructure/repositories/CartRepository';

// Service for managing shopping carts
export class CartService implements ICartService {
  private cartRepository: CartRepository;

  constructor() {
    this.cartRepository = new CartRepository();
  }

  // Add a product to the user's cart
  public async addToCart(userId: string, product: Product): Promise<Cart> {
    let cart = await this.cartRepository.getByUserId(userId);

    // If the cart does not exist, create a new one
    if (!cart) {
      cart = {
        id: 'cart-' + userId,
        userId,
        products: [],
      };
    }

    // Add the product to the cart
    cart.products.push(product);

    // Save the updated cart in the repository
    return await this.cartRepository.save(cart);
  }

  // Remove a product from the user's cart
  public async removeFromCart(
    userId: string,
    productId: string,
  ): Promise<Cart> {
    let cart = await this.cartRepository.getByUserId(userId);

    if (!cart) {
      throw new Error('Cart not found');
    }

    // Filter out the product from the cart
    cart.products = cart.products.filter((p) => p.id !== productId);

    // Save the updated cart in the repository
    return await this.cartRepository.save(cart);
  }

  // Get the cart associated with a specific user
  public async getCart(userId: string): Promise<Cart | null> {
    return await this.cartRepository.getByUserId(userId);
  }
}
