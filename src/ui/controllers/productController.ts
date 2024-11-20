import { Request, Response, NextFunction } from 'express';
import { ProductService } from '../../application/services/ProductService';
import { Product } from '../../domain/models/Product';

const productService = new ProductService();

// Get all products
export const getProducts = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const products = await productService.getProducts();
    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};

// Get a product by its unique identifier
export const getProductById = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const productId = req.params.productId;
    const product = await productService.getProductById(productId);
    if (!product) {
      res.status(404).json({ error: 'Product not found' });
      return;
    }
    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};

// Create a new product
export const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const newProduct: Product = {
      id: '',
      ...req.body,
    };
    const createdProduct = await productService.createProduct(newProduct);
    res.status(201).json(createdProduct);
  } catch (error) {
    next(error);
  }
};

// Import products from a CSV file
export const importProductsFromCSV = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    if (!req.file) {
      res.status(400).json({ error: 'No file uploaded' });
      return;
    }

    const products = await productService.importProductsFromFile(req.file.path);
    res
      .status(200)
      .json({ message: 'Products imported successfully', products });
  } catch (error) {
    next(error);
  }
};
