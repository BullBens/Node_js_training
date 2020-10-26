import { AuthMiddleware } from "../middlewares/auth.middleware";
import { injectable, inject } from "inversify";
import {
  RequestPost,
  Controller,
  RouteHandler,
  ResponseBase,
  JwtHelper,
  RequestGet,
  ApplicationError,
} from "./../common";
import { UserService } from "../services/user.service";
import { AuthContextModel } from "models";
const path = require("path");

var fs = require("fs");
const multer = require("multer");
const HOST = process.env.HOST || "localhost:80";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    var newPath = path.join(__dirname, "../../public/uploads");
    cb(null, newPath);
  },
  filename: (req, file, cb) => {
    const type = file.mimetype == "image/jpeg" ? "jpeg" : "png";
    cb(null, file.originalname + "." + type);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype == "image/jpeg" || file.mimetype == "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({ storage: storage, fileFilter: fileFilter }).single(
  "image"
);

@injectable()
export class UserController implements Controller {
  @inject(UserService) private _userService: UserService;
  @inject(JwtHelper) private _jwtHelper: JwtHelper;

  constructor() {
    this.profile = this.profile.bind(this);
    this.getAll = this.getAll.bind(this);
  }
  async getAll(request: RequestPost<any>, response: ResponseBase<any>) {
    let fileContext = await this._userService.getAll();
    return response.send(fileContext);
  }

  async getUser(request: RequestGet<any>, response: ResponseBase<any>) {
    let profile = await this._userService.getAll();
    return response.send(profile);
  }

  async profile(request: RequestGet<any>, response: ResponseBase<any>) {
    try {
      let user = await this._userService.getUserById(request.user.id);
      return response.send(user);
    } catch (error) {
      throw new ApplicationError(`"Error get user`);
    }
  }

  async uploadProfileImage(request, response) {
    try {
      let photo =
        HOST +
        request.file.path.substring(request.file.path.indexOf("/uploads")) +
        "?" +
        Date.now();
      let user = await this._userService.updateUser(request.user.id, {
        photo,
      });
      response.send(user);
    } catch (error) {
      throw new ApplicationError(`"Error write photo url for profile`);
    }
  }

  routes(): RouteHandler[] {
    const handlers: RouteHandler[] = [];
    const prefix = "user";
    handlers.push({
      route: `/${prefix}`,
      handlers: [AuthMiddleware, <any>this.profile],
      type: "GET",
    });
    handlers.push({
      route: `/${prefix}/`,
      handlers: [AuthMiddleware, <any>this.getUser],
      type: "GET",
    });
    handlers.push({
      route: `/${prefix}/upload-profile-image`,
      handlers: [
        AuthMiddleware,
        upload,
        <any>this.uploadProfileImage.bind(this),
      ],
      type: "POST",
    });
    handlers.push({
      route: `/${prefix}/get-all`,
      handlers: [AuthMiddleware, <any>this.getAll],
      type: "GET",
    });
    return handlers;
  }
}
