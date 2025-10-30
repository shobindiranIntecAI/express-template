import { UserI } from '@/types';

export class UserService {
  static async getUserById(id: string): Promise<UserI> {
    return {
      id: id,
      name: 'Hello World',
    };
  }
}
