import { AuthRegisterModel, AuthUserModel } from "../models";
import { UserRepository } from "../repositories";
import { inject, injectable } from "inversify";
import { ApplicationError } from "../common";
import { HashEncrypter } from "./../common/hash-encrypter";
import { Environments } from "../environment/environment";
import { SendEmailService } from "./sendEmail.service";
import { nanoid } from "nanoid";

var jwt = require("jsonwebtoken");
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(Environments.sendGridApiKey);

@injectable()
export class AuthService {
  constructor(
    @inject(SendEmailService) private _sendEmailService: SendEmailService,
    @inject(UserRepository) private _userRepository: UserRepository,
    @inject(HashEncrypter) private _hashEncrypter: HashEncrypter
  ) {}

  async register(registerModel: AuthRegisterModel): Promise<boolean> {
    const hashedPassword: string = this._hashEncrypter.getHash(
      registerModel.password
    );
    const existedUser = await this._userRepository.findOne(
      registerModel.email,
      hashedPassword
    );
    if (existedUser && existedUser.confirmed) {
      throw new ApplicationError("User already exist!");
    }
    if (existedUser && !existedUser.confirmed) {
      return await this._sendEmailService
        .emailConfirm(
          existedUser._id,
          existedUser.email,
          "andreiafanaskin@gmail.com"
        )
        .then(() => {
          return true;
        })
        .catch(() => {
          return false;
        });
    }
    const userEntity = await this._userRepository.add({
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
      invitationHashCode: nanoid(),
    });
    if (userEntity) {
      return await this._sendEmailService
        .emailConfirm(
          userEntity._id,
          userEntity.email,
          "andreiafanaskin@gmail.com"
        )
        .then(() => {
          return true;
        })
        .catch(() => {
          return false;
        });
    } else {
      throw new ApplicationError("Error create user!");
    }
  }

  async get(login: string, password: string): Promise<AuthUserModel> {
    const hashedPassword = this._hashEncrypter.getHash(password);
    const value = await this._userRepository.findOne(login, hashedPassword);
    if (!value) {
      throw new ApplicationError("Invalid email or password");
    }
    if (!value.confirmed) {
      throw new ApplicationError("Please confirm your email to login");
    }
    return value;
  }

  async emailConfirm(token: string): Promise<boolean> {
    return await jwt.verify(
      token,
      Environments.secret,
      async (err, decoded) => {
        if (err) {
          throw new ApplicationError("Error email token");
        }
        return await this._userRepository
          .findByIdAndUpdate(decoded._id, {
            confirmed: true,
          })
          .then(() => {
            return true;
          })
          .catch((err) => {
            throw new ApplicationError("Error email confirm ");
          });
      }
    );
  }

  async requestResetPassword(email: string): Promise<any> {
    // const user = this.get()
  }
}
