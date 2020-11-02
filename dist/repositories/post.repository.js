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
const inversify_1 = require("inversify");
const mongoose_1 = require("mongoose");
const post_schema_1 = require("../schemas/post.schema");
const user_repository_1 = require("./user.repository");
const ObjectId = mongoose_1.Types.ObjectId;
exports.PostModel = mongoose_1.model("posts", post_schema_1.PostSchema);
let PostRepository = class PostRepository {
    constructor() { }
    add(body) {
        return __awaiter(this, void 0, void 0, function* () {
            let newValue = yield exports.PostModel.create(body);
            return newValue;
        });
    }
    get(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let userPosts = yield user_repository_1.UserModel.aggregate([
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
        });
    }
};
PostRepository = __decorate([
    inversify_1.injectable(),
    __metadata("design:paramtypes", [])
], PostRepository);
exports.PostRepository = PostRepository;
//# sourceMappingURL=post.repository.js.map