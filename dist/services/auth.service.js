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
const repositories_1 = require("../repositories");
const inversify_1 = require("inversify");
const common_1 = require("../common");
const hash_encrypter_1 = require("./../common/hash-encrypter");
const environment_1 = require("../environment/environment");
const sendEmail_service_1 = require("./sendEmail.service");
const nanoid_1 = require("nanoid");
var jwt = require("jsonwebtoken");
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(environment_1.Environments.sendGridApiKey);
let AuthService = class AuthService {
    constructor(_sendEmailService, _userRepository, _hashEncrypter) {
        this._sendEmailService = _sendEmailService;
        this._userRepository = _userRepository;
        this._hashEncrypter = _hashEncrypter;
    }
    register(registerModel) {
        return __awaiter(this, void 0, void 0, function* () {
            const hashedPassword = this._hashEncrypter.getHash(registerModel.password);
            const existedUser = yield this._userRepository.findOne(registerModel.email, hashedPassword);
            if (existedUser && existedUser.confirmed) {
                throw new common_1.ApplicationError("User already exist!");
            }
            if (existedUser && !existedUser.confirmed) {
                return yield this._sendEmailService
                    .emailConfirm(existedUser._id, existedUser.email, "andreiafanaskin@gmail.com")
                    .then(() => {
                    return true;
                })
                    .catch(() => {
                    return false;
                });
            }
            const userEntity = yield this._userRepository.add({
                friends: [],
                login: registerModel.login,
                email: registerModel.email,
                password: hashedPassword,
                type: registerModel.type,
                photo: null,
                city: registerModel.city,
                classification: registerModel.classification,
                coins: 0,
                isAdmin: false,
                confirmed: false,
                invitationHashCode: nanoid_1.nanoid(),
            });
            if (userEntity) {
                return yield this._sendEmailService
                    .emailConfirm(userEntity._id, userEntity.email, "andreiafanaskin@gmail.com")
                    .then(() => {
                    return true;
                })
                    .catch(() => {
                    return false;
                });
            }
            else {
                throw new common_1.ApplicationError("Error create user!");
            }
        });
    }
    get(login, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const hashedPassword = this._hashEncrypter.getHash(password);
            const value = yield this._userRepository.findOne(login, hashedPassword);
            if (!value) {
                throw new common_1.ApplicationError("Invalid email or password");
            }
            if (!value.confirmed) {
                throw new common_1.ApplicationError("Please confirm your email to login");
            }
            return value;
        });
    }
    emailConfirm(token) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield jwt.verify(token, environment_1.Environments.secret, (err, decoded) => __awaiter(this, void 0, void 0, function* () {
                if (err) {
                    throw new common_1.ApplicationError("Error email token");
                }
                return yield this._userRepository
                    .findByIdAndUpdate(decoded._id, {
                    confirmed: true,
                })
                    .then(() => {
                    return true;
                })
                    .catch((err) => {
                    throw new common_1.ApplicationError("Error email confirm ");
                });
            }));
        });
    }
    requestResetPassword(email) {
        return __awaiter(this, void 0, void 0, function* () {
            // const user = this.get()
        });
    }
};
AuthService = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(sendEmail_service_1.SendEmailService)),
    __param(1, inversify_1.inject(repositories_1.UserRepository)),
    __param(2, inversify_1.inject(hash_encrypter_1.HashEncrypter)),
    __metadata("design:paramtypes", [sendEmail_service_1.SendEmailService,
        repositories_1.UserRepository,
        hash_encrypter_1.HashEncrypter])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map