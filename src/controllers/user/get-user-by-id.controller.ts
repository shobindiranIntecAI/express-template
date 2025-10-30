import { UserService } from '@/services';
import { ResponseHandler } from '@/utils/response-handler.util';
import type { NextFunction, Request, Response } from 'express';

import createError from 'http-errors';

export async function getUserById(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { userId } = req.params;
  if (!userId) {
    createError(400, 'user not found');
  }
  try {
    const user = await UserService.getUserById(userId);
    return ResponseHandler.success(res, 'Fetched user successfully', user);
  } catch (err) {
    next(err);
  }
}
