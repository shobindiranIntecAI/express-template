import 'module-alias/register';
import { app } from './app';
import { env } from './config/env';
import { logger } from './utils/logger.util';
import { rabbitmq } from './helper/rabbitmq';

const server = app.listen(env.PORT, () => {
  logger.info(`Server running on port ${env.PORT}`);
});
(async () => await rabbitmq.connect())();
process.on('SIGTERM', () => {
  logger.info('SIGTERM received, shutting down gracefully...');
  server.close(() => {
    logger.info('Server closed.');
  });
});
