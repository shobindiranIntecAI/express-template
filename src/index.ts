import 'module-alias/register';
import { app } from './app';
import { env } from './config/env';
import { logger } from './utils/logger.util';
import { connectDatabases, disconnectDatabases } from './config/database';


(async()=>{
  await connectDatabases();
})();

const server = app.listen(env.PORT, () => {
  logger.info(`Server running on port ${env.PORT}`);
});

process.on('SIGINT', async () => {
  logger.info('SIGINT received: closing application...');
  await disconnectDatabases();
  // await disco;
  process.exit(0);
});

process.on('SIGTERM', async () => {
  logger.info('SIGTERM received, shutting down gracefully...');
  await disconnectDatabases();
  server.close(() => {
    logger.info('Server closed.');
  });
  process.exit(0);
});
