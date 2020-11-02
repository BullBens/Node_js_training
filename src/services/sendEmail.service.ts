import { injectable } from "inversify";
import { Environments } from "../environment/environment";

const jwt = require("jsonwebtoken");
const sgMail = require("@sendgrid/mail");

@injectable()
export class SendEmailService {
  async emailConfirm(_id: string, to: string, from: string) {
    const emailToken = jwt.sign(
      {
        _id,
      },

      Environments.secret
    );
    const url = `${Environments.emailConfirmUrl}${emailToken}`;
    var email = {
      to,
      from,
      subject: "Email confirm",
      text: url,
    };
    return sgMail.send(email);
  }
  async resetPassword(_id: string, to: string, from: string) {}
}
