import { injectable } from "inversify";
import { model, Types } from "mongoose";
import { PostSchema } from "../schemas/post.schema";
import { UserModel } from "./user.repository";

const ObjectId = Types.ObjectId;
export const PostModel = model("posts", PostSchema);

@injectable()
export class PostRepository {
  constructor() {}

  async add(body: any): Promise<any> {
    let newValue = await PostModel.create(body);
    return newValue;
  }
  async get(id: any): Promise<any> {
    let userPosts = await UserModel.aggregate([
      { $match: { _id: ObjectId(id) } },
      {
        $lookup: {
          from: "posts",
          localField: "friends",
          foreignField: "author",
          as: "posts",
        },
      },
      {
        $project: {
          posts: {
            _id: 1,
            message: 1,
            location: 1,
          },
        },
      },
    ]);
    return userPosts[0].posts;
  }
}
