"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_middleware_1 = require("../middlewares/auth.middleware");
const inversify_1 = require("inversify");
const common_1 = require("./../common");
const user_service_1 = require("../services/user.service");
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
    }
    else {
        cb(null, false);
    }
};
const upload = multer({ storage: storage, fileFilter: fileFilter }).single("image");
let UserController = class UserController {
    constructor() {
        this.profile = this.profile.bind(this);
        this.addToFriendsList = this.addToFriendsList.bind(this);
        this.getFriends = this.getFriends.bind(this);
    }
    getFriends(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            let friends = yield this._userService.getFriends(request.user.id);
            return response.send(friends);
        });
    }
    profile(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let user = yield this._userService.getUserById(request.user.id);
                return response.send(user);
            }
            catch (error) {
                throw new common_1.ApplicationError(`"Error get user`);
            }
        });
    }
    addToFriendsList(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let data = yield this._userService.addToFriendsList(request.body.invitationHashCode, request.user.id);
                return response.send(data);
            }
            catch (error) {
                throw new common_1.ApplicationError(`"Error get user`);
            }
        });
    }
    uploadProfileImage(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let photo = HOST +
                    request.file.path.substring(request.file.path.indexOf("/uploads")) +
                    "?" +
                    Date.now();
                let user = yield this._userService.updateUser(request.user.id, {
                    photo,
                });
                response.send(user);
            }
            catch (error) {
                throw new common_1.ApplicationError(`"Error write photo url for profile`);
            }
        });
    }
    routes() {
        const handlers = [];
        const prefix = "user";
        handlers.push({
            route: `/${prefix}`,
            handlers: [auth_middleware_1.AuthMiddleware, this.profile],
            type: "GET",
        });
        handlers.push({
            route: `/${prefix}/upload-profile-image`,
            handlers: [
                auth_middleware_1.AuthMiddleware,
                upload,
                this.uploadProfileImage.bind(this),
            ],
            type: "POST",
        });
        handlers.push({
            route: `/${prefix}/add-to-friends-list`,
            handlers: [auth_middleware_1.AuthMiddleware, this.addToFriendsList],
            type: "POST",
        });
        handlers.push({
            route: `/${prefix}/get-friends`,
            handlers: [auth_middleware_1.AuthMiddleware, this.getFriends],
            type: "GET",
        });
        return handlers;
    }
};
__decorate([
    inversify_1.inject(user_service_1.UserService),
    __metadata("design:type", user_service_1.UserService)
], UserController.prototype, "_userService", void 0);
__decorate([
    inversify_1.inject(common_1.JwtHelper),
    __metadata("design:type", common_1.JwtHelper)
], UserController.prototype, "_jwtHelper", void 0);
UserController = __decorate([
    inversify_1.injectable(),
    __metadata("design:paramtypes", [])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map