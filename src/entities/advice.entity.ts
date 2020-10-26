import { Schema } from "mongoose";

export interface AdviceEntity {
  _id: String;
  _author: String;
  title: String;
  message: String;
  date_of: Date;
}
