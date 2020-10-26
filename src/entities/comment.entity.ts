import { Schema } from "mongoose";

export interface CommentEntity {
  _comment: Schema.Types.ObjectId;
  _eventId: Schema.Types.ObjectId;
  _author: Schema.Types.ObjectId;
  text: String;
  blocked: Boolean;
  date_of: Date;
}
