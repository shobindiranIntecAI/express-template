import { config } from 'dotenv';
import { z } from 'zod';

config();

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']),
  PORT: z.string(),
  QUEUE_RABBITMQ_URL: z.string(),
  QUEUE_RABBITMQ_EXCHANGE_NAME: z.string(),
  QUEUE_RABBITMQ_EXCHANGE_TYPE: z.string(),
});

export const env = envSchema.parse(process.env);
