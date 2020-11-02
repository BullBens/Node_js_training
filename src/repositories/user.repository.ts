import { UserEntity } from "../entities";
import { injectable } from "inversify";
import { model, Types } from "mongoose";
import { UserSchema } from "./../schemas/user.schema";

const ObjectId = Types.ObjectId;
export const UserModel = model("users", UserSchema);

@injectable()
export class UserRepository {
  constructor() {}

  async add(entity: UserEntity): Promise<any> {
    let newValue = await UserModel.create(entity);
    return newValue;
  }
  async findById(id: string): Promise<any> {
    let user = await UserModel.findById(id);
    return user;
  }

  async getFriends(id: string) {
    let userFriends = await UserModel.aggregate([
      { $match: { _id: ObjectId(id) } },
      {
        $lookup: {
          from: "users",
          localField: "friends",
          foreignField: "_id",
          as: "friends",
        },
      },
      {
        $project: {
          friends: {
            _id: 1,
            login: 1,
            photo: 1,
          },
        },
      },
    ]);
    return userFriends[0].friends;
  }

  async findByInvitationHashCodeAndUpdateFriends(
    invitationHashCode: string,
    id: string
  ) {
    let searchedProfile = await UserModel.findOneAndUpdate(
      { invitationHashCode },
      {
        $addToSet: {
          friends: ObjectId(id),
        },
      }
    );
    return searchedProfile;
  }

  async findByIdAndUpdateFriends(
    _id: string,
    searchedProfileId: string
  ): Promise<any> {
    let user = await UserModel.findOneAndUpdate(
      { _id },
      {
        $addToSet: {
          friends: ObjectId(searchedProfileId),
        },
      }
    );
    return user;
  }

  async findByIdAndUpdate(_id: string, eventEntity: any): Promise<any> {
    let result = await UserModel.findByIdAndUpdate({ _id }, eventEntity, {
      new: true,
    })
      .then(async (res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });
    return result;
  }
  async getProfile() {
    let result = {};
    // ToDo
    return result;
  }

  async findOne(email: string, password: string): Promise<any> {
    const result = await UserModel.findOne({
      email: email,
      password: password,
    });
    return result;
  }
  async getByEmail(email: string): Promise<any> {
    const result = await UserModel.findOne({ email });
    return result;
  }
}
