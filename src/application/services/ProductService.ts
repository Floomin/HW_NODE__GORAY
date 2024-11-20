import { IProductService } from '../../domain/services/IProductService';
import { Product } from '../../domain/models/Product';
import { ProductRepository } from '../../infrastructure/repositories/ProductRepository';
import fs from 'fs';
import csv from 'csv-parser';
import { randomUUID } from 'crypto';

export class ProductService implements IProductService {
  private productRepository: ProductRepository;

  constructor() {
    this.productRepository = new ProductRepository();
  }

  // Get all products
  public async getProducts(): Promise<Product[]> {
    return await this.productRepository.getAll();
  }

  // Get a product by ID
  public async getProductById(id: string): Promise<Product | null> {
    return await this.productRepository.getById(id);
  }

  // Create a new product
  public async createProduct(product: Product): Promise<Product> {
    product.id = randomUUID();
    return await this.productRepository.create(product);
  }

  // Import products from a file using streams
  public async importProductsFromFile(filePath: string): Promise<Product[]> {
    const products: Product[] = [];
    const readStream = fs.createReadStream(filePath);

    return new Promise((resolve, reject) => {
      readStream
        .pipe(csv())
        .on('data', (data) => {
          data.id = randomUUID(); // Generate unique ID
          products.push(data);
        })
        .on('end', async () => {
          // Use stream for writing products to the repository
          await this.productRepository.bulkInsertStream(products);
          resolve(products);
        })
        .on('error', (error) => reject(error));
    });
  }
}
