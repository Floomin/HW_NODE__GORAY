import { Product } from '../../domain/models/Product';
import fs from 'fs';
import path from 'path';

const productsFilePath = path.join(
  __dirname,
  '../../resources/products.store.json',
);

export class ProductRepository {
  // Get all products from the JSON file
  public async getAll(): Promise<Product[]> {
    const data = await fs.promises.readFile(productsFilePath, 'utf-8');
    return JSON.parse(data);
  }

  // Get a product by ID
  public async getById(id: string): Promise<Product | null> {
    const products = await this.getAll();
    return products.find((product) => product.id === id) || null;
  }

  // Create a new product
  public async create(product: Product): Promise<Product> {
    const products = await this.getAll();
    products.push(product);
    await fs.promises.writeFile(
      productsFilePath,
      JSON.stringify(products, null, 2),
    );
    return product;
  }

  // Streamed bulk insert for multiple products
  public async bulkInsertStream(newProducts: Product[]): Promise<void> {
    const writeStream = fs.createWriteStream(productsFilePath, { flags: 'a' });

    writeStream.write('[');

    newProducts.forEach((product, index) => {
      const jsonStr =
        JSON.stringify(product) +
        (index === newProducts.length - 1 ? ']' : ',');
      writeStream.write(jsonStr);
    });

    return new Promise((resolve, reject) => {
      writeStream.end();
      writeStream.on('finish', resolve);
      writeStream.on('error', reject);
    });
  }
}
