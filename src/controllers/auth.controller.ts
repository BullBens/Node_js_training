import { AuthService } from "../services/auth.service";
import {
  AuthResponseModel,
  AuthLoginModel,
  AuthRegisterModel,
} from "models";
import { injectable, inject } from "inversify";
import {
  JwtHelper,
  Controller,
  RequestPost,
  ResponseBase,
  RequestGet,
  RouteHandler,
} from "../common";
import * as fs from "fs";

@injectable()
export class AuthController implements Controller {
  @inject(AuthService) private _authService: AuthService;
  @inject(JwtHelper) private _jwtHelper: JwtHelper;

  constructor() {
    this.register = this.register.bind(this);
    this.login = this.login.bind(this);
    this.emailConfirm = this.emailConfirm.bind(this);
  }

  async register(
    request: RequestPost<AuthRegisterModel>,
    response: ResponseBase<boolean>
  ) {
    const res = await this._authService.register({ ...request.body });
    return response.send(res);
  }

  async login(
    request: RequestPost<AuthLoginModel>,
    response: ResponseBase<AuthResponseModel>
  ) {
    const user = await this._authService.get(
      request.body.email,
      request.body.password
    );
    const authContext = this._jwtHelper.authenticate(user);
    return response.send(authContext);
  }

  async resetPassword(request: RequestPost<any>, response: ResponseBase<any>) {
    const res = this._authService.requestResetPassword(request.body.email);
    return response.send(res);
  }

  async emailConfirm(
    request: RequestGet<{ emailToken: string }>,
    response: any
  ) {
    try {
      await this._authService.emailConfirm(request.query.emailToken);
      fs.readFile("./public/email-success-confirm.html", function (err, html) {
        if (err) {
          throw err;
        }
        response.writeHeader(200, { "Content-Type": "text/html" });
        response.write(html);
        return response.end();
      });
    } catch {
      fs.readFile("./public/email-error-confirm.html", function (err, html) {
        if (err) {
          throw err;
        }
        response.writeHeader(200, { "Content-Type": "text/html" });
        response.write(html);
        return response.end();
      });
    }
  }

  routes(): RouteHandler[] {
    const handlers: RouteHandler[] = [];
    const prefix = "auth";

    handlers.push({
      route: `/${prefix}/email-confirm`,
      handlers: [<any>this.emailConfirm],
      type: "GET",
    });
    handlers.push({
      route: `/${prefix}/reset-password`,
      handlers: [<any>this.resetPassword],
      type: "GET",
    });
    handlers.push({
      route: `/${prefix}/registration`,
      handlers: [<any>this.register],
      type: "POST",
    });
    handlers.push({
      route: `/${prefix}/login`,
      handlers: [<any>this.login],
      type: "POST",
    });
    return handlers;
  }
}
