import { Schema } from "mongoose";

export class UserEntity {
  login: string;
  email: string;
  password: string;
  photo: string | null;
  type: number;
  city: string;
  classification: number;
  coins: number;
  confirmed: boolean;
  isAdmin: boolean;
}
