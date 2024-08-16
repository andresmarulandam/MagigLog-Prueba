import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

import { configuration } from './config/config.js';
import authRoutes from './routes/auth.routes.js';

const { FRONTEND_URL } = configuration.frontend;
const { BACKEND_URL } = configuration.backend;

const app = express();

app.use(
  cors({
    origin: FRONTEND_URL,
  }),
);
app.use(morgan('dev'));
app.use(express.json());

app.use(authRoutes);

export default app;
