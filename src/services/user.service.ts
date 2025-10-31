import createHttpError from 'http-errors';
import { UserMongoRepo } from '../repositories/mongo/user.repo';
import { userPostgresRepo } from '@/repositories/postgres/user.repo';

export class UserService {
  static async registerUser(name: string, email: string) {
    const existing = await UserMongoRepo.findByEmail(email);
    if (existing) {
      throw createHttpError(409, 'User already exists');
    }

    return UserMongoRepo.createUser({ name, email });
  }

  static async createUser(name: string, email: string) {
    const existing = await userPostgresRepo.findUserByEmail(email);
    if (existing) {
      throw createHttpError(409, 'User already exists');
    }

    return userPostgresRepo.registerUser({ name, email });
  }
}
