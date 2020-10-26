import { DependencyModel } from "models/feature/dependency.model";
import { AttributeModel } from "models/feature/attribute.model";

export interface FeatureEntity{
  id: String,
  name: String,
  type: String,
  dependencyOn: DependencyModel[],
  image: String,
  description: String,
  date: Date,
  attributes?: AttributeModel[],
}
