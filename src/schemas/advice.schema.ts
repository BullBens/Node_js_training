import { Schema } from "mongoose";

export const AdviceSchema = new Schema(
  {
    _id: {
      type: Schema.Types.ObjectId,
      required: true,
      auto: true,
    },
    _author: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    date_of: {
      type: Date,
      required: true,
    },
  },
  {
    collection: "comments",
  }
);
