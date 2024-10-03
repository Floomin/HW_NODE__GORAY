import { products } from '../storage.js';

export const getProducts = (req, res) => {
  res.status(200).json(products);
};

export const getProductById = (req, res) => {
  const productId = parseInt(req.params.productId, 10);

  const product = products.find((p) => p.id === productId);

  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }

  res.status(200).json(product);
};
