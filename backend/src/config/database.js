import mongoose from 'mongoose';
import { configuration } from './config.js';

const { MONGO_USER, MONGO_PASSWORD } = configuration.database;
export const connectDatabase = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@cluster0.3micl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`,
    );
    console.log('Database is connected');
  } catch (error) {
    console.log(error);
  }
};
