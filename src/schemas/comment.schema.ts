import { Schema } from "mongoose";

export const CommentSchema = new Schema(
  {
    _id: {
      type: Schema.Types.ObjectId,
      required: true,
      auto: true,
    },
    _author: {
      type: Schema.Types.ObjectId,
    },
    message: {
      type: String,
    },
    date_of: {
      type: Date,
    },
  },
  {
    collection: "comments",
  }
);
