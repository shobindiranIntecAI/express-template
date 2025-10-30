import express from 'express';
import helmet from 'helmet';
import createError from 'http-errors';
import { logger } from './utils/logger.util';
import { env } from './config/env';
import routes from './routes';
import { errorHandler } from '@/middlewares/error-handler.middleware';

export const app = express();

app.use(helmet());
app.use(express.json());

// routes
app.use('/api', routes);

// fallback for 404
app.use((_req, _res, next) => next(createError(404, 'Route not found')));

// global error handler
app.use(errorHandler);

// basic startup log
logger.info(`Environment: ${env.NODE_ENV}`);
