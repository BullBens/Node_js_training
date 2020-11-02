import { inject, injectable } from "inversify";
import { model } from "mongoose";
import { UserSchema } from "../schemas/user.schema";
import { UserRepository } from "../repositories/user.repository";
import { ApplicationError } from "../common";
import { AuthContextModel } from "models";

const UserModel = model("users", UserSchema);

@injectable()
export class UserService {
  constructor(
    @inject(UserRepository) private _userRepository: UserRepository
  ) {}
  async getFriends(id: string) {
    const friends = await this._userRepository.getFriends(id);
    return friends;
  }
  async getUserById(id: string) {
    const user = await this._userRepository.findById(id);
    return user;
  }

  async addToFriendsList(invitationHashCode: string, id: string): Promise<any> {
    console.log(invitationHashCode);
    const searchedProfile = await this._userRepository.findByInvitationHashCodeAndUpdateFriends(
      invitationHashCode,
      id
    );
    if (searchedProfile) {
      const user = await this._userRepository.findByIdAndUpdateFriends(
        id,
        searchedProfile.id
      );
      if (user) {
        let login = searchedProfile.get("login");
        return { login };
      } else {
        // ToDo
      }
    } else {
      throw new ApplicationError(`"Profile not found`);
    }
  }

  async updateUser(_id: string, data: any) {
    const user = await this._userRepository.findByIdAndUpdate(_id, data);
    if (user) {
      return user;
    } else {
      throw new ApplicationError(`"Error write photo url for profile`);
    }
  }
}
