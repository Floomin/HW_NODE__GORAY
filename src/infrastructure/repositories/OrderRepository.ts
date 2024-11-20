import { Order } from '../../domain/models/Order';
import { promises as fs } from 'fs';
import path from 'path';

// Repository for managing orders
export class OrderRepository {
  private filePath: string;

  constructor() {
    // Set the path to the JSON file where orders are stored
    this.filePath = path.join(__dirname, '../../resources/orders.store.json');
  }

  // Save a new order to the JSON file
  public async save(order: Order): Promise<Order> {
    const orders = await this.getAllOrders();
    orders.push(order);
    await fs.writeFile(this.filePath, JSON.stringify(orders, null, 2));
    return order;
  }

  // Get all orders from the JSON file
  private async getAllOrders(): Promise<Order[]> {
    const data = await fs.readFile(this.filePath, 'utf-8');
    return JSON.parse(data) as Order[];
  }
}
