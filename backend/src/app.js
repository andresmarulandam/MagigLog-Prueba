import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { configuration } from './config/config.js';

const { FRONTEND_URL } = configuration.frontend;

const app = express();

app.use(
  cors({
    origin: FRONTEND_URL,
  }),
);
app.use(morgan('dev'));

export default app;
