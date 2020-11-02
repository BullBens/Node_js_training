"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const environment_1 = require("../environment/environment");
const jsonwebtoken = require("jsonwebtoken");
const inversify_1 = require("inversify");
let JwtHelper = class JwtHelper {
    authenticate(user) {
        const authContext = {
            id: user.id,
            photo: user.photo,
            login: user.login,
            email: user.email,
            type: user.type,
            city: user.city,
            coins: user.coins,
            classification: user.classification,
            invitationHashCode: user.invitationHashCode,
            isAdmin: user.isAdmin,
            confirmed: user.confirmed
        };
        const token = jsonwebtoken.sign(authContext, environment_1.Environments.secret, {
            expiresIn: environment_1.Environments.tokenExpiresIn,
        });
        return {
            token: token,
            user: authContext,
            expiresIn: environment_1.Environments.tokenExpiresIn,
        };
    }
    verify(token) {
        return new Promise((resolve, reject) => {
            jsonwebtoken.verify(token, environment_1.Environments.secret, (err, decoded) => {
                if (err) {
                    reject(null);
                    return;
                }
                resolve(decoded);
            });
        });
    }
};
JwtHelper = __decorate([
    inversify_1.injectable()
], JwtHelper);
exports.JwtHelper = JwtHelper;
//# sourceMappingURL=jwt-helper.js.map