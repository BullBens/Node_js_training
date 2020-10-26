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
    },
    _likes: {
      type: Schema.Types.ObjectId,
    },
    _comments: {
      type: Schema.Types.ObjectId,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    date_of: {
      type: Date,
      required: true,
    },
    end_date: {
      type: Date,
      required: true,
    },
  },
  {
    collection: "comments",
  }
);
