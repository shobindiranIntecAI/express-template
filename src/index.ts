import 'module-alias/register';
import { app } from './app';
import { env } from './config/env';
import { logger } from './utils/logger.util';

const server = app.listen(env.PORT, () => {
  logger.info(`Server running on port ${env.PORT}`);
});

process.on('SIGTERM', () => {
  logger.info('SIGTERM received, shutting down gracefully...');
  server.close(() => {
    logger.info('Server closed.');
  });
});
