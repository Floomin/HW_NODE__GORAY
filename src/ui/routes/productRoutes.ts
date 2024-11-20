import { Router } from 'express';
import {
  getProducts,
  getProductById,
  createProduct,
  importProductsFromCSV,
} from '../controllers/productController';
import { validateProduct } from '../../domain/validation/productValidation';
import upload from '../middleware/upload';

const router: Router = Router();

router.get('/', getProducts);

router.get('/:productId', getProductById);

router.post('/createProduct', validateProduct, createProduct);

router.post('/import', upload.single('file'), importProductsFromCSV);

export default router;
