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
const auth_service_1 = require("../services/auth.service");
const inversify_1 = require("inversify");
const common_1 = require("../common");
const fs = require("fs");
let AuthController = class AuthController {
    constructor() {
        this.register = this.register.bind(this);
        this.login = this.login.bind(this);
        this.emailConfirm = this.emailConfirm.bind(this);
    }
    register(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield this._authService.register(Object.assign({}, request.body));
            return response.send(res);
        });
    }
    login(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this._authService.get(request.body.email, request.body.password);
            const authContext = this._jwtHelper.authenticate(user);
            return response.send(authContext);
        });
    }
    resetPassword(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = this._authService.requestResetPassword(request.body.email);
            return response.send(res);
        });
    }
    emailConfirm(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            debugger;
            try {
                yield this._authService.emailConfirm(request.query.emailToken);
                fs.readFile("./public/email-success-confirm.html", function (err, html) {
                    if (err) {
                        throw err;
                    }
                    response.writeHeader(200, { "Content-Type": "text/html" });
                    response.write(html);
                    return response.end();
                });
            }
            catch (_a) {
                fs.readFile("./public/email-error-confirm.html", function (err, html) {
                    if (err) {
                        throw err;
                    }
                    response.writeHeader(200, { "Content-Type": "text/html" });
                    response.write(html);
                    return response.end();
                });
            }
        });
    }
    routes() {
        const handlers = [];
        const prefix = "auth";
        handlers.push({
            route: `/${prefix}/email-confirm`,
            handlers: [this.emailConfirm],
            type: "GET",
        });
        handlers.push({
            route: `/${prefix}/reset-password`,
            handlers: [this.resetPassword],
            type: "GET",
        });
        handlers.push({
            route: `/${prefix}/register`,
            handlers: [this.register],
            type: "POST",
        });
        handlers.push({
            route: `/${prefix}/login`,
            handlers: [this.login],
            type: "POST",
        });
        return handlers;
    }
};
__decorate([
    inversify_1.inject(auth_service_1.AuthService),
    __metadata("design:type", auth_service_1.AuthService)
], AuthController.prototype, "_authService", void 0);
__decorate([
    inversify_1.inject(common_1.JwtHelper),
    __metadata("design:type", common_1.JwtHelper)
], AuthController.prototype, "_jwtHelper", void 0);
AuthController = __decorate([
    inversify_1.injectable(),
    __metadata("design:paramtypes", [])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map