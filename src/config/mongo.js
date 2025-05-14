import mongoose from 'mongoose';

const connectToMongo = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/expressddd');
    console.log('🟢 MongoDB connected');
  } catch (err) {
    console.error('❌ MongoDB connection error:', err);
  }
};

export default connectToMongo;
