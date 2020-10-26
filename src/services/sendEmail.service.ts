import { injectable } from "inversify";
import { Environments } from "../environment/environment";

const jwt = require("jsonwebtoken");
const sgMail = require("@sendgrid/mail");

@injectable()
export class SendEmailService {
  async emailConfirm(_id: string, to: string, from: string) {
    debugger
    const emailToken = jwt.sign(
      {
        _id,
      },

      Environments.secret
    );
    debugger
    const url = `${Environments.emailConfirmUrl}${emailToken}`;
    var email = {
      to,
      from,
      subject: "Email confirm",
      text: url,
    };
    debugger
    return sgMail.send(email);
  }
  async resetPassword(_id: string, to: string, from: string) {
      
  }
}
