import { Router } from 'express';
import { authRequired } from '../middlewares/validateToken.js';
import { validateSchema } from '../middlewares/validator.js';
import { registerSchema, loginSchema } from '../schemas/auth.schema.js';
import {
  login,
  logout,
  profile,
  register,
} from '../controllers/auth.controller.js';

const router = Router();

router.post('/register', validateSchema(registerSchema), register);
router.post('/login', validateSchema(loginSchema), login);
router.post('/logout', logout);
router.get('/profile', authRequired, profile);

export default router;
