import { Schema } from "mongoose";

export const EventSchema = new Schema(
  {
    _id: {
      type: Schema.Types.ObjectId,
      required: true,
      auto: true,
    },
    _author: {
      type: Schema.Types.ObjectId,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    geo: {
      latitude: Number,
      longitude: Number,
    },
    kind: {
      type: Number,
      required: true,
    },
    start_date: {
      type: Date,
      required: true,
    },
    end_date: {
      type: Date,
      required: true,
    },
    date_of: {
      type: Date,
      required: true,
    },
    likes: {
      type: Array,
      require: true,
    },
    comments: [],
  },
  {
    collection: "events",
  }
);
