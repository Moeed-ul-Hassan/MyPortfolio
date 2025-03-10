
import mongoose from 'mongoose';
import { log } from './vite';

// MongoDB connection function
export async function connectToDatabase() {
  try {
    // Use environment variable for MongoDB URI in production
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio';
    
    await mongoose.connect(mongoURI);
    log('MongoDB connected successfully');
    
    // Set up connection error handling
    mongoose.connection.on('error', (err) => {
      log(`MongoDB connection error: ${err}`);
    });
    
    mongoose.connection.on('disconnected', () => {
      log('MongoDB disconnected');
    });
    
    // Handle application termination
    process.on('SIGINT', async () => {
      await mongoose.connection.close();
      log('MongoDB connection closed due to app termination');
      process.exit(0);
    });
    
    return mongoose.connection;
  } catch (error) {
    log(`MongoDB connection error: ${error}`);
    process.exit(1);
  }
}
