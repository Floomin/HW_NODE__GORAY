import { Cart } from '../../domain/models/Cart';
import { promises as fs } from 'fs';
import path from 'path';

// Repository for managing carts
export class CartRepository {
  private filePath: string;

  constructor() {
    // Set the path to the JSON file where carts are stored
    this.filePath = path.join(__dirname, '../../resources/carts.store.json');
  }

  // Get a cart by the user's ID
  public async getByUserId(userId: string): Promise<Cart | null> {
    const data = await fs.readFile(this.filePath, 'utf-8');
    const carts = JSON.parse(data) as Cart[];
    return carts.find((cart) => cart.userId === userId) || null;
  }

  // Save the cart to the JSON file (create or update)
  public async save(cart: Cart): Promise<Cart> {
    const carts = await this.getAllCarts();
    const existingCartIndex = carts.findIndex((c) => c.userId === cart.userId);

    if (existingCartIndex >= 0) {
      carts[existingCartIndex] = cart; // Update the existing cart
    } else {
      carts.push(cart); // Add a new cart
    }

    await fs.writeFile(this.filePath, JSON.stringify(carts, null, 2));
    return cart;
  }

  // Clear the cart for a specific user
  public async clearCart(userId: string): Promise<void> {
    let carts = await this.getAllCarts();
    carts = carts.filter((cart) => cart.userId !== userId);
    await fs.writeFile(this.filePath, JSON.stringify(carts, null, 2));
  }

  // Get all carts from the JSON file
  private async getAllCarts(): Promise<Cart[]> {
    const data = await fs.readFile(this.filePath, 'utf-8');
    return JSON.parse(data) as Cart[];
  }
}
