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
const post_service_1 = require("../services/post.service");
const inversify_1 = require("inversify");
const common_1 = require("../common");
const auth_middleware_1 = require("../middlewares/auth.middleware");
let PostController = class PostController {
    constructor() {
        this.create = this.create.bind(this);
        this.get = this.get.bind(this);
    }
    create(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const post = yield this._postService.createPost(request.user.id, request.body);
            return response.send(post);
        });
    }
    get(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const posts = yield this._postService.getPosts(request.user.id);
            return response.send(posts);
        });
    }
    delete(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this._postService.createPost(request.body.email, request.body.password);
            const authContext = this._jwtHelper.authenticate(user);
            return response.send(authContext);
        });
    }
    update(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this._postService.createPost(request.body.email, request.body.password);
            const authContext = this._jwtHelper.authenticate(user);
            return response.send(authContext);
        });
    }
    routes() {
        const handlers = [];
        const prefix = "post";
        handlers.push({
            route: `/${prefix}/create`,
            handlers: [auth_middleware_1.AuthMiddleware, this.create],
            type: "POST",
        });
        handlers.push({
            route: `/${prefix}`,
            handlers: [auth_middleware_1.AuthMiddleware, this.get],
            type: "GET",
        });
        handlers.push({
            route: `/${prefix}/update`,
            handlers: [this.update],
            type: "PUT",
        });
        handlers.push({
            route: `/${prefix}/`,
            handlers: [this.delete],
            type: "DELETE",
        });
        return handlers;
    }
};
__decorate([
    inversify_1.inject(post_service_1.PostService),
    __metadata("design:type", post_service_1.PostService)
], PostController.prototype, "_postService", void 0);
__decorate([
    inversify_1.inject(common_1.JwtHelper),
    __metadata("design:type", common_1.JwtHelper)
], PostController.prototype, "_jwtHelper", void 0);
PostController = __decorate([
    inversify_1.injectable(),
    __metadata("design:paramtypes", [])
], PostController);
exports.PostController = PostController;
//# sourceMappingURL=post.controller.js.map