// src/database/postgres/dataSource.ts
import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { logger } from '@/utils/logger.util';
// Import entities
import { User } from '@/entities/index';

export const postgresDataSource = new DataSource({
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  synchronize: true, // disable in production
  logging: false,
  entities: [User],
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
