import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { logger } from '@/utils/logger.util';
import fs from "fs";
import { env } from '../env';
// Import entities
import { User } from '@/entities/index';

const isRDS = env.POSTGRES_HOST.includes("amazonaws.com");
export const postgresDataSource = new DataSource({
  type: 'postgres',
  host: env.POSTGRES_HOST,
  port: Number(env.POSTGRES_PORT),
  username: env.POSTGRES_USER,
  password: env.POSTGRES_PASSWORD,
  database: env.POSTGRES_DB,
  synchronize: true, // disable in production
  logging: false,
  entities: [User],
  ssl:isRDS
    ? {
        ca: fs.readFileSync("./global-bundle.pem").toString(),
      }
    : false,
});

export async function connectPostgres() {
  try {
    await postgresDataSource.initialize();
    logger.info('✅ PostgreSQL connected');
  } catch (err) {
    logger.error({ err }, '❌ PostgreSQL connection failed');
    throw err;
  }
}

export async function disconnectPostgres() {
  try {
    if (postgresDataSource.isInitialized) {
      await postgresDataSource.destroy();
      logger.info('🛑 PostgreSQL disconnected');
    } else {
      logger.warn(
        '⚠️ PostgreSQL DataSource not initialized, skipping disconnect'
      );
    }
  } catch (err) {
    logger.error({ err }, '❌ Error during PostgreSQL disconnect');
    throw err;
  }
}
