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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
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
const user_schema_1 = require("../schemas/user.schema");
const user_repository_1 = require("../repositories/user.repository");
const common_1 = require("../common");
const UserModel = mongoose_1.model("users", user_schema_1.UserSchema);
let UserService = class UserService {
    constructor(_userRepository) {
        this._userRepository = _userRepository;
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield this._userRepository.getAll();
            return users;
        });
    }
    getUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this._userRepository.findById(id);
            return user;
        });
    }
    // async getUser() {
    //   const profile = await this._userRepository.;
    //   return {};
    // }
    updateUser(_id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this._userRepository.findByIdAndUpdate(_id, data);
            if (user) {
                return user;
            }
            else {
                throw new common_1.ApplicationError(`"Error write photo url for profile`);
            }
        });
    }
};
UserService = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(user_repository_1.UserRepository)),
    __metadata("design:paramtypes", [user_repository_1.UserRepository])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map