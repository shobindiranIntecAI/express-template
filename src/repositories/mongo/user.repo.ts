import { UserModel } from '../../models/user.model';

export class UserMongoRepo {
  static async findByEmail(email: string) {
    return UserModel.findOne({ email });
  }

  static async createUser(data: { name: string; email: string }) {
    return UserModel.create(data);
  }
}
