import { Product } from '../models/Product';

// Interface that defines the operations for managing products
export interface IProductService {
  // Get all products available in the store
  getProducts(): Promise<Product[]>;

  // Get a product by its unique identifier
  getProductById(id: string): Promise<Product | null>;

  // Create a new product
  createProduct(product: Product): Promise<Product>;

  // Import multiple products into the store
  importProductsFromFile(filePath: string): Promise<Product[]>;
}
