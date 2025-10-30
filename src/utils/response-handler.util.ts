// src/utils/responseHandler.ts
import { Response } from 'express';
import { logger } from './logger.util';

type SuccessPayload<T> = {
  success: true;
  message?: string;
  data?: T;
};

type ErrorPayload = {
  success: false;
  message: string;
  status?: number;
  stack?: string;
};

export class ResponseHandler {
  static success<T>(res: Response, message: string, data?: T, status = 200) {
    logger.info({ message, data }, 'Success response');
    const payload: SuccessPayload<T> = {
      success: true,
      message,
      data,
    };
    return res.status(status).json(payload);
  }

  static error(res: Response, message: string, status = 500, stack?: string) {
    logger.error({ message, status, stack }, 'Error response');
    const payload: ErrorPayload = {
      success: false,
      message,
      status,
      ...(process.env.NODE_ENV === 'development' && stack ? { stack } : {}),
    };
    return res.status(status).json(payload);
  }
}
