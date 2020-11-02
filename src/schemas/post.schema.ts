import { Schema } from "mongoose";

export const PostSchema = new Schema(
  {
    _id: {
      type: Schema.Types.ObjectId,
      required: true,
      auto: true,
    },
    author: {
      type:  Schema.Types.ObjectId || null,
      require: true,
    },
    message: {
      type: String,
      required: true,
    },
    location: {
      type: {
        latitude: {
          type: Number,
        },
        longitude: {
          type: Number,
        },
      },
    },
  },
  {
    collection: "posts",
  }
);
