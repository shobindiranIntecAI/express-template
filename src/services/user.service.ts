import type { UserI } from '@/types';
import createHttpError from 'http-errors';

export class UserService {
  static async getUserById(id: string): Promise<UserI> {
    if (!id) {
      throw createHttpError(400, 'Id not given');
    }
    return {
      id,
      name: 'Hello World',
    };
  }
}
