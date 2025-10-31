// src/database/mongo/mongoClient.ts
import mongoose from 'mongoose';
import { logger } from '@/utils/logger.util';

export async function connectMongo() {
  const uri = process.env.MONGO_URI!;
  const isDocumentDB = uri.includes('amazonaws.com');

  const options = isDocumentDB
    ? {
        tls: true,
        tlsCAFile: './global-bundle.pem',
      }
    : {};
  try {
    await mongoose.connect(uri, options);
    logger.info('✅ MongoDB connected');
  } catch (err) {
    logger.error({ err }, '❌ MongoDB connection failed');
    throw err;
  }
}

export async function disconnectMongo() {
  await mongoose.disconnect();
  logger.info('🔌 MongoDB disconnected');
}
