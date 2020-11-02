import { Schema } from "mongoose";

export class UserEntity {
  login: string;
  email: string;
  password: string;
  photo: string | null;
  type: number;
  city: string;
  classification: number;
  invitationHashCode: string;
  friends: Array<string>;
  coins: number;
  confirmed: boolean;
  isAdmin: boolean;
}
