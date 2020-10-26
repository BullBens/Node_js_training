import { Schema } from "mongoose";

export interface EventResponseModel {
  _author: Schema.Types.ObjectId;
  name: String;
  description: String;
  geo: {
    latitude: Number;
    longitude: Number;
  };
  kind: Number;
  start_date: Date;
  end_date: Date;
  date_of: Date;
  likes: Array<Schema.Types.ObjectId>;
  comments: Array<Schema.Types.ObjectId>;
//   userInfo: 
}
