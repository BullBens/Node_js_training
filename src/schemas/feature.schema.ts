import { Schema } from "mongoose";

export const  FeatureSchema = new Schema({
    _id: Schema.Types.ObjectId,
    id: String,
    name: String,
    type: String,
    dependencyOn: Array,
    image: String,
    description: String,
    date: Date,
    attributes: Array,
  }, {
      collection: 'features'
    }
  );