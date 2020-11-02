import { PostService } from "../services/post.service";
import { injectable, inject } from "inversify";
import {
  JwtHelper,
  Controller,
  RequestPost,
  ResponseBase,
  RequestGet,
  RouteHandler,
} from "../common";
import { AuthMiddleware } from "../middlewares/auth.middleware";

@injectable()
export class PostController implements Controller {
  @inject(PostService) private _postService: PostService;
  @inject(JwtHelper) private _jwtHelper: JwtHelper;

  constructor() {
    this.create = this.create.bind(this);
    this.get = this.get.bind(this);
  }

  async create(request: RequestPost<any>, response: ResponseBase<any>) {
    const post = await this._postService.createPost(
      request.user.id,
      request.body
    );
    return response.send(post);
  }
  async get(request: RequestGet<any>, response: ResponseBase<any>) {
    const posts = await this._postService.getPosts(request.user.id);
    return response.send(posts);
  }
  async delete(request: RequestPost<any>, response: ResponseBase<any>) {
    const user = await this._postService.createPost(
      request.body.email,
      request.body.password
    );
    const authContext = this._jwtHelper.authenticate(user);
    return response.send(authContext);
  }
  async update(request: RequestPost<any>, response: ResponseBase<any>) {
    const user = await this._postService.createPost(
      request.body.email,
      request.body.password
    );
    const authContext = this._jwtHelper.authenticate(user);
    return response.send(authContext);
  }

  routes(): RouteHandler[] {
    const handlers: RouteHandler[] = [];
    const prefix = "post";

    handlers.push({
      route: `/${prefix}/create`,
      handlers: [AuthMiddleware, <any>this.create],
      type: "POST",
    });
    handlers.push({
      route: `/${prefix}`,
      handlers: [AuthMiddleware, <any>this.get],
      type: "GET",
    });
    handlers.push({
      route: `/${prefix}/update`,
      handlers: [<any>this.update],
      type: "PUT",
    });
    handlers.push({
      route: `/${prefix}/`,
      handlers: [<any>this.delete],
      type: "DELETE",
    });
    return handlers;
  }
}
