import { connectMongo, disconnectMongo } from './mongo';
import { connectPostgres, disconnectPostgres } from './postgres';
import { logger } from '@/utils/logger.util';

export async function connectDatabases() {
  try {
    await Promise.all([connectMongo(), connectPostgres()]);
    logger.info('🚀 All databases connected successfully');
  } catch (err) {
    logger.error({ err }, '❌ Database initialization error');
    process.exit(1);
  }
}

export async function disconnectDatabases() {
  try {
    await Promise.all([disconnectMongo(), disconnectPostgres()]);
    logger.info('⛓️‍💥 All databases disconnected successfully');
  } catch (err) {
    logger.error({ err }, '❌ Database disconnection failed');
  }
}
