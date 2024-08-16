import { Router } from 'express';
import { authRequired } from '../middlewares/validateToken.js';
import { roleRequired } from '../middlewares/verifyRole.js';
import { productSchema } from '../schemas/products.schema.js';
import { validateSchema } from '../middlewares/validator.js';
import {
  getProduct,
  getProducts,
  createProduct,
  deleteProduct,
  updateProduct,
} from '../controllers/products.controller.js';

const router = Router();

router.post(
  '/products',
  authRequired,
  validateSchema(productSchema),
  roleRequired(['vendedor']),
  createProduct,
);
router.get('/products', authRequired, getProducts);
router.get('/products/:id', authRequired, getProduct);
router.put(
  '/products/:id',
  authRequired,
  roleRequired(['vendedor']),
  updateProduct,
);
router.delete(
  '/products/:id',
  authRequired,
  roleRequired(['vendedor']),
  deleteProduct,
);

export default router;
