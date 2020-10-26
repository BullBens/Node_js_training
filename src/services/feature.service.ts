import { FeatureModel, FeatureCreateModel } from "../models";
import { FeatureRepository } from "../repositories";
import { FeatureEntity } from "../entities";
import { inject, injectable } from "inversify";
import { model } from "mongoose";
import { FeatureSchema } from "../schemas/feature.schema";
import { ApplicationError } from "../common";

const FeatureModel = model('features', FeatureSchema)

@injectable()
export class FeatureService {
  constructor(
    @inject(FeatureRepository) private featureRepository: FeatureRepository
  ) {}

  async add(feature: FeatureCreateModel) {
    const existedFeature = await FeatureModel.findOne({id: feature.id});

    if (existedFeature) {
      throw new ApplicationError(`"Feature with ${feature.id} ID already exist!`);
    }
    const featureEntity: FeatureEntity = feature;
    this.featureRepository.add(featureEntity);
    const featureModel: FeatureModel = featureEntity;
    return featureModel;
  }

  async get() {
    const feature = await this.featureRepository.get();
    return feature;
  }
  async remove(featureId: String) {
    const existedFeature = await FeatureModel.findOne({id: featureId});

    if (!existedFeature) {
      throw new ApplicationError(`"Feature with ${featureId} ID doesn't exist!`);
    }
    const featureNewValue = await this.featureRepository.remove(featureId);
    return featureNewValue;
  }
  async update(requestId: any, feature: FeatureCreateModel) {
    const existedFeature = await FeatureModel.findOne({id: requestId});

    if (!existedFeature) {
      throw new ApplicationError(`"Feature with ${requestId} ID doesn't exist!`);
    }
    const featureNewValue = await this.featureRepository.update(requestId, feature);
    return featureNewValue;
  }
}
