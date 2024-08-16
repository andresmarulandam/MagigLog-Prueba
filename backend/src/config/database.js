import mongoose from 'mongoose';

export const connectDatabase = async () => {
  try {
    await mongoose.connect(
      'mongodb+srv://marulandaandres19:tOkFNQOSRZIv6iXO@cluster0.3micl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
    );
    console.log('Database is connected');
  } catch (error) {
    console.log(error);
  }
};
