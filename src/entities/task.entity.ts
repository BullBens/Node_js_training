import { Schema } from "mongoose";

export interface TaskEntity {
  _id: String;
  _author: String;
  _likes: {
    type: Schema.Types.ObjectId;
  };
  _comments: {
    type: Schema.Types.ObjectId;
  };
  title: String;
  description: String;
  date_of: Date;
  end_date: Date;
}
