import { inject, injectable } from "inversify";
import { PostRepository } from "../repositories/post.repository";
import { Types } from "mongoose";
const ObjectId = Types.ObjectId;
@injectable()
export class PostService {
  constructor(
    @inject(PostRepository) private _postRepository: PostRepository
  ) {}
  async createPost(author: string, body: any) {
    body.author = ObjectId(author);
    const post = await this._postRepository.add(body);
    return post;
  }
  async getPosts(id: string) {
    const posts = await this._postRepository.get(id);
    return posts;
  }
}
