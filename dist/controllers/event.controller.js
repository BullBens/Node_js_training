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
const auth_middleware_1 = require("../middlewares/auth.middleware");
const event_service_1 = require("../services/event.service");
const path = require("path");
var fs = require("fs");
const multer = require("multer");
const Storage = multer.diskStorage({
    destination(req, files, callback) {
        callback(null, "../../public/uploads");
    },
    filename(req, files, callback) {
        callback(null, `${files.fieldname}_${Date.now()}_${files.originalname}`);
    },
});
let EventController = class EventController {
    constructor() {
        this.addEvent = this.addEvent.bind(this);
        this.removeEventById = this.removeEventById.bind(this);
        this.getEventById = this.getEventById.bind(this);
        this.updateEventById = this.updateEventById.bind(this);
    }
    addEvent(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            Object.assign(request.body, {
                _author: request.user.id,
                date_of: new Date().toUTCString(),
                likes: [],
                comments: [],
            });
            let eventContext = yield this._eventService.add(request.body);
            return response.send(eventContext);
        });
    }
    getEventById(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            let eventContext = yield this._eventService.getById(request.query.id);
            return response.send(eventContext);
        });
    }
    removeEventById(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            let eventContext = yield this._eventService.removeById(request.query.id);
            return response.send(eventContext);
        });
    }
    updateEventById(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            let eventContext = yield this._eventService.updateById(request.query.id, request.body);
            return response.send(eventContext);
        });
    }
    test(request, response) {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    routes() {
        const handlers = [];
        const prefix = "event";
        handlers.push({
            route: `/${prefix}/`,
            handlers: [auth_middleware_1.AuthMiddleware, this.addEvent],
            type: "POST",
        });
        handlers.push({
            route: `/${prefix}/remove/`,
            handlers: [auth_middleware_1.AuthMiddleware, this.removeEventById],
            type: "GET",
        });
        handlers.push({
            route: `/${prefix}/`,
            handlers: [auth_middleware_1.AuthMiddleware, this.getEventById],
            type: "GET",
        });
        handlers.push({
            route: `/${prefix}/`,
            handlers: [auth_middleware_1.AuthMiddleware, this.updateEventById],
            type: "PUT",
        });
        return handlers;
    }
};
__decorate([
    inversify_1.inject(event_service_1.EventService),
    __metadata("design:type", event_service_1.EventService)
], EventController.prototype, "_eventService", void 0);
EventController = __decorate([
    inversify_1.injectable(),
    __metadata("design:paramtypes", [])
], EventController);
exports.EventController = EventController;
//# sourceMappingURL=event.controller.js.map