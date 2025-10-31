import 'module-alias/register';
import { app } from './app';
import { env } from './config/env';
import { logger } from './utils/logger.util';
import { rabbitmq } from './helper/rabbitmq';

const server = app.listen(env.PORT, () => {
  logger.info(`Server running on port ${env.PORT}`);
});
(async () => {
  try {
    await rabbitmq.connect();
    logger.info('RabbitMQ connected successfully');
  } catch (err: any) {
    logger.error('RabbitMQ connection failed', err.message);
  }
})();
process.on('SIGTERM', () => {
  logger.info('SIGTERM received, shutting down gracefully...');
  server.close(() => {
    logger.info('Server closed.');
  });
});
