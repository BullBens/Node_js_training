import { AuthMiddleware } from "../middlewares/auth.middleware";
import { FeatureService } from "../services";
import { injectable, inject } from "inversify";
import { RequestPost, Controller, RouteHandler, ResponseBase, ApplicationError } from "./../common";

@injectable()
export class FeatureController implements Controller {
  @inject(FeatureService) private _featureService: FeatureService;

  constructor() {
    this.add = this.add.bind(this);
    this.get = this.get.bind(this);
    this.remove = this.remove.bind(this)
    this.update = this.update.bind(this)
  }

  async add(
    request: RequestPost<any>,
    response: ResponseBase<any>
  ) {
    Object.assign(request.body, {_id: null, date: new Date().toUTCString()});
    let featureContext = await this._featureService.add(request.body);
    return response.send(featureContext);
  }

  async get(
    request: RequestPost<any>,
    response: ResponseBase<any>
  ) {
    let featureContext =  await this._featureService.get();
    return response.send(featureContext);
  }
  async remove(request: any, response: any) {
    let featureContext =  await this._featureService.remove(request.params.id);
    return response.send(featureContext);
  }
  async update(request: any, response: any) {
    delete request.body.id
    delete request.body._id
    let featureContext =  await this._featureService.update(request.params.id, request.body);
    return response.send(featureContext);
  }

  routes(): RouteHandler[] {
    const handlers: RouteHandler[] = [];
    const prefix = "feature";
    handlers.push({
      route: `/${prefix}/get`,
      handlers: [AuthMiddleware, <any>this.get],
      type: "GET"
    });
    handlers.push({
      route: `/${prefix}/create`,
      handlers: [AuthMiddleware, <any>this.add],
      type: "POST"
    });
    handlers.push({
      route: `/${prefix}/remove/:id`,
      handlers: [AuthMiddleware, <any>this.remove],
      type: "POST"
    });
    handlers.push({
      route: `/${prefix}/update/:id`,
      handlers: [AuthMiddleware, <any>this.update],
      type: "POST"
    });
    return handlers;
  }
}
