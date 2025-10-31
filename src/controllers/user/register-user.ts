import type { Request, Response, NextFunction } from 'express';
import { ResponseHandler } from '@/utils/response-handler.util';
import { UserService } from '@/services';

export async function registerUserPostgres(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { name, email } = req.body;
    const user = await UserService.createUser(name, email);
    return ResponseHandler.success(res, 'User registered successfully', user);
  } catch (err) {
    next(err);
  }
}
export async function registerUserMongo(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { name, email } = req.body;
    const user = await UserService.registerUser(name, email);
    return ResponseHandler.success(res, 'User registered successfully', user);
  } catch (err) {
    next(err);
  }
}
