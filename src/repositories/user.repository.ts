import { UserEntity } from "../entities";
import { injectable } from "inversify";
import { model } from "mongoose";
import { UserSchema } from "./../schemas/user.schema";

export const UserModel = model("users", UserSchema);

@injectable()
export class UserRepository {
  constructor() {}

  async add(entity: UserEntity): Promise<any> {
    let newValue = await UserModel.create(entity);
    return newValue;
  }
  async getAll(): Promise<any> {
    let newValue = await UserModel.find();
    return newValue;
  }
  async findById(id: string): Promise<any> {
    let user = await UserModel.findById(id);
    return user
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
