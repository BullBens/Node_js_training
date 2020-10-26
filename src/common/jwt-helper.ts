import { Environments } from "../environment/environment";
import { AuthUserModel, AuthContextModel, AuthResponseModel } from "models";
import * as jsonwebtoken from "jsonwebtoken";
import { injectable } from "inversify";

@injectable()
export class JwtHelper {
  authenticate(user: AuthUserModel): AuthResponseModel {
    const authContext: AuthContextModel = {
      id: user.id,
      photo: user.photo,
      login: user.login,
      email: user.email,
      type: user.type,
      city: user.city,
      coins: user.coins,
      classification: user.classification,
      isAdmin: user.isAdmin,
      confirmed: user.confirmed
    };
     
    const token = jsonwebtoken.sign(authContext, Environments.secret, {
      expiresIn: Environments.tokenExpiresIn,
    });
    return {
      token: token,
      user: authContext,
      expiresIn: Environments.tokenExpiresIn,
    };
  }

  verify(token: string): Promise<AuthContextModel> {
    return new Promise((resolve, reject) => {
      jsonwebtoken.verify(token, Environments.secret, (err, decoded) => {
        if (err) {
          reject(null);
          return;
        }
        resolve(decoded);
      });
    });
  }
}
