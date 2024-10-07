import express from 'express';
import { getProducts, getProductById, createProduct, importProductsFromCSV } from '../controllers/productController.js';
import { validateProduct } from '../middleware/productValidation.js';
import upload from '../middleware/upload.js';

const router = express.Router();

router.get('/', getProducts);

router.get('/:productId', getProductById);

router.post('/createProduct', validateProduct, createProduct);

router.post('/import', upload.single('file'), importProductsFromCSV);

export default router;
