import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import { configuration } from './config/config.js';
import authRoutes from './routes/auth.routes.js';
import productsRoutes from './routes/products.routes.js';

const { FRONTEND_URL } = configuration.frontend;
const { BACKEND_URL } = configuration.backend;

const app = express();

app.use(
  cors({
    origin: FRONTEND_URL,
    credentials: true,
  }),
);
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());

app.use(authRoutes);
app.use(productsRoutes);

export default app;
