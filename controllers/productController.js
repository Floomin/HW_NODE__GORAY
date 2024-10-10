import { readProducts, writeProducts } from '../services/fileService.js';
import { randomUUID } from 'crypto';
import csv from 'csv-parser';
import fs from 'fs';
import fileUploadEmitter from '../services/fileUploadEmitter.js';
import { readProductsFile, writeProductsFile } from '../services/fileService.js';

export const getProducts = async (req, res, next) => {
  try {
    const products = await readProducts();
    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};

export const getProductById = async (req, res, next) => {
  try {
    const productId = req.params.productId;
    const products = await readProducts();
    const product = products.find(p => p.id === productId);

    if (!product) {
      const error = new Error('Product not found');
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};

export const createProduct = async (req, res, next) => {
  try {
    const { name, description, category, price } = req.body;

    const newProduct = {
      id: randomUUID(),
      name,
      description,
      category,
      price
    };

    const products = await readProducts();
    products.push(newProduct);

    await writeProducts(products);
    res.status(201).json(newProduct);
  } catch (error) {
    next(error);
  }
};

export const importProductsFromCSV = (req, res, next) => {
  const products = [];
  try {
    fileUploadEmitter.emit('fileUploadStart');

    const fileStream = fs.createReadStream(req.file.path);

    fileStream
      .pipe(csv())
      .on('data', (row) => {
        const newProduct = {
          id: randomUUID(),
          name: row.name,
          description: row.description,
          category: row.category,
          price: parseFloat(row.price),
        };

        if (!newProduct.name || !newProduct.category || isNaN(newProduct.price)) {
          return next(new Error('Invalid product data'));
        }

        products.push(newProduct);
      })
      .on('end', async () => {
        try {
          const existingProducts = await readProductsFile();
          const updatedProducts = [...existingProducts, ...products];
          await writeProductsFile(updatedProducts);

          res.status(200).json({ message: 'Products imported successfully', products });
        } catch (error) {
          next(error);
        }
      })
      .on('error', (err) => {
        next(err);
      });
  } catch (error) {
    fileUploadEmitter.emit('fileUploadFailed', error);
    next(error);
  }

};