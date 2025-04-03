import mongoose from 'mongoose';

const MONGO_URI = process.env.MONGO_URI || '';

const initMongoDB = async () => {
   try {
      await mongoose.connect(MONGO_URI, {
         serverSelectionTimeoutMS: 5000,
         socketTimeoutMS: 45000,
      });
      console.log('MongoDB Connected');
   } catch (error) {
      console.error(' MongoDB Connection Error:', error);
      setTimeout(initMongoDB, 5000);
   }
};

mongoose.connection.on('disconnected', () => {
   console.log('MongoDB Disconnected. Attempting to reconnect...');
   setTimeout(initMongoDB, 5000);
});

mongoose.connection.on('error', err => {
   console.error('MongoDB Connection Error:', err);
   mongoose.disconnect();
});

export default initMongoDB;
