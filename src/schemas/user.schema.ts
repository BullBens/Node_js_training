import { Schema } from "mongoose";

export const UserSchema = new Schema(
  {
    _id: {
      type: Schema.Types.ObjectId,
      required: true,
      auto: true,
    },
    photo: {
      type: String || null,
      require: true,
    },
    email: {
      type: String,
      required: true,
    },
    invitationHashCode: {
      type: String,
      required: true,
    },
    friends: {
      type: Array,
      required: true,
    },
    login: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    type: {
      type: Number,
      required: true,
    },
    coins: {
      type: Number,
      required: true,
    },
    classification: {
      type: Number,
      required: true,
    },
    confirmed: {
      type: Boolean,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
    },
  },
  {
    collection: "users",
  }
);
