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
const services_1 = require("../services");
const inversify_1 = require("inversify");
let FeatureController = class FeatureController {
    constructor() {
        this.add = this.add.bind(this);
        this.get = this.get.bind(this);
        this.remove = this.remove.bind(this);
        this.update = this.update.bind(this);
    }
    add(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            Object.assign(request.body, { _id: null, date: new Date().toUTCString() });
            let featureContext = yield this._featureService.add(request.body);
            return response.send(featureContext);
        });
    }
    get(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            let featureContext = yield this._featureService.get();
            return response.send(featureContext);
        });
    }
    remove(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            let featureContext = yield this._featureService.remove(request.params.id);
            return response.send(featureContext);
        });
    }
    update(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            delete request.body.id;
            delete request.body._id;
            let featureContext = yield this._featureService.update(request.params.id, request.body);
            return response.send(featureContext);
        });
    }
    routes() {
        const handlers = [];
        const prefix = "feature";
        handlers.push({
            route: `/${prefix}/get`,
            handlers: [auth_middleware_1.AuthMiddleware, this.get],
            type: "GET"
        });
        handlers.push({
            route: `/${prefix}/create`,
            handlers: [auth_middleware_1.AuthMiddleware, this.add],
            type: "POST"
        });
        handlers.push({
            route: `/${prefix}/remove/:id`,
            handlers: [auth_middleware_1.AuthMiddleware, this.remove],
            type: "POST"
        });
        handlers.push({
            route: `/${prefix}/update/:id`,
            handlers: [auth_middleware_1.AuthMiddleware, this.update],
            type: "POST"
        });
        return handlers;
    }
};
__decorate([
    inversify_1.inject(services_1.FeatureService),
    __metadata("design:type", services_1.FeatureService)
], FeatureController.prototype, "_featureService", void 0);
FeatureController = __decorate([
    inversify_1.injectable(),
    __metadata("design:paramtypes", [])
], FeatureController);
exports.FeatureController = FeatureController;
//# sourceMappingURL=feature.controller.js.map