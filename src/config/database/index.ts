import { connectMongo, disconnectMongo } from './mongo';
import { connectPostgres, disconnectPostgres } from './postgres';
import { logger } from '@/utils/logger.util';
import RedisClient from './redis';

export async function connectDatabases() {
  try {
    const connectRedis = new RedisClient();
    await Promise.all([
      connectPostgres(),
      connectMongo(),
      connectRedis.connect(),
    ]);
    logger.info('🚀 All databases connected successfully');
  } catch (err) {
    logger.error({ err }, '❌ Database initialization error');
    process.exit(1);
  }
}

export async function disconnectDatabases() {
  try {
    const connectRedis = new RedisClient();
    await Promise.all([
      disconnectMongo(),
      disconnectPostgres(),
      connectRedis.disconnect(),
    ]);
    logger.info('⛓️‍💥 All databases disconnected successfully');
  } catch (err) {
    logger.error({ err }, '❌ Database disconnection failed');
  }
}
