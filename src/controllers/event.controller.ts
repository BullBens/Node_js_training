import { EventCreateModel } from "models";
import { injectable, inject } from "inversify";
import {
  Controller,
  RequestPost,
  ResponseBase,
  RequestGet,
  RouteHandler,
} from "../common";
import { AuthMiddleware } from "../middlewares/auth.middleware";
import { EventService } from "../services/event.service";

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

@injectable()
export class EventController implements Controller {
  @inject(EventService) private _eventService: EventService;

  constructor() {
    this.addEvent = this.addEvent.bind(this);
    this.removeEventById = this.removeEventById.bind(this);
    this.getEventById = this.getEventById.bind(this);
    this.updateEventById = this.updateEventById.bind(this);
  }

  async addEvent(
    request: RequestPost<EventCreateModel>,
    response: ResponseBase<any>
  ) {
    Object.assign(request.body, {
      _author: request.user.id,
      date_of: new Date().toUTCString(),
      likes: [],
      comments: [],
    });

    let eventContext = await this._eventService.add(request.body);
    return response.send(eventContext);
  }
  async getEventById(request: RequestGet<any>, response: ResponseBase<any>) {
    let eventContext = await this._eventService.getById(request.query.id);
    return response.send(eventContext);
  }
  async removeEventById(request: RequestGet<any>, response: ResponseBase<any>) {
    let eventContext = await this._eventService.removeById(request.query.id);
    return response.send(eventContext);
  }
  async updateEventById(request: any, response: ResponseBase<any>) {
    let eventContext = await this._eventService.updateById(
      request.query.id,
      request.body
    );
    return response.send(eventContext);
  }
  async test(request: any, response: ResponseBase<any>) {}

  routes(): RouteHandler[] {
    const handlers: RouteHandler[] = [];
    const prefix = "event";
    handlers.push({
      route: `/${prefix}/`,
      handlers: [AuthMiddleware, <any>this.addEvent],
      type: "POST",
    });
    handlers.push({
      route: `/${prefix}/remove/`,
      handlers: [AuthMiddleware, <any>this.removeEventById],
      type: "GET",
    });
    handlers.push({
      route: `/${prefix}/`,
      handlers: [AuthMiddleware, <any>this.getEventById],
      type: "GET",
    });
    handlers.push({
      route: `/${prefix}/`,
      handlers: [AuthMiddleware, <any>this.updateEventById],
      type: "PUT",
    });
    return handlers;
  }
}
