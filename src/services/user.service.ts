import { inject, injectable } from "inversify";
import { model } from "mongoose";
import { UserSchema } from "../schemas/user.schema";
import { UserRepository } from "../repositories/user.repository";
import { ApplicationError } from "../common";

const UserModel = model("users", UserSchema);

@injectable()
export class UserService {
  constructor(
    @inject(UserRepository) private _userRepository: UserRepository
  ) {}
  async getAll() {
    const users = await this._userRepository.getAll();
    return users;
  }
  async getUserById(id: string) {
    const user = await this._userRepository.findById(id);
    return user;
  }
  // async getUser() {
  //   const profile = await this._userRepository.;
  //   return {};
  // }
  async updateUser(_id: string, data: any) {
    const user = await this._userRepository.findByIdAndUpdate(_id, data);
    if (user) {
      return user;
    } else {
      throw new ApplicationError(`"Error write photo url for profile`);
    }
  }
}
