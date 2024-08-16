import * as dotenv from 'dotenv';

dotenv.config();

export const configuration = {
  server: {
    port: process.env.PORT || 4000,
  },
  database: {
    MONGO_USER: process.env.MONGO_USER,
    MONGO_PASSWORD: process.env.MONGO_PASSWORD,
  },
  frontend: {
    FRONTEND_URL: process.env.FRONTEND_URL || 'http://localhost:5173/',
  },
  backend: {
    BACKEND_URL: process.env.BACKEND_URL,
  },
  tokenSecret: {
    tokenSecret: process.env.TOKEN_SECRET,
  },
};
