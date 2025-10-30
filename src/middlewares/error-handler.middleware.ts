import type { Request, Response, NextFunction } from 'express';
import { logger } from '../utils/logger.util';
import { ResponseHandler } from '@/utils/response-handler.util';
import type { HttpError } from 'http-errors';

export function errorHandler(
  err: HttpError,
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
