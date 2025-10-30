import { Request, Response, NextFunction } from 'express';
import { logger } from '../utils/logger.util';
import { ResponseHandler } from '@/utils/response-handler.util';

export function errorHandler(
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  const status = err.status || 500;
  const message = err.message || 'Internal Server Error';
  const stack = process.env.NODE_ENV === 'development' ? err.stack : undefined;
  logger.error({ err, status }, 'Request error');

  return ResponseHandler.error(res, message, status, stack);
}
