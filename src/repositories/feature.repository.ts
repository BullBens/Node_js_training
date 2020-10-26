import { FeatureEntity } from "../entities/feature.entity";
import { injectable } from "inversify";
import { model } from "mongoose";
import { FeatureSchema } from "./../schemas/feature.schema";


export const FeatureModel = model('features', FeatureSchema);

@injectable()
export class FeatureRepository {
  constructor() { }
  async add(featureEntity: FeatureEntity): Promise<FeatureEntity> {
    let newValue:any = await FeatureModel.create(featureEntity);
    featureEntity = newValue;
    return featureEntity;
  }

  async get(): Promise<FeatureEntity[]> {
    var result: any = await FeatureModel.find();
    return result;
  }
  async remove(id: String){
    let elem = await FeatureModel.findOne({id: id})
    const filter = {_id: elem._id}
    let removeFeatureValue:any = await FeatureModel.findByIdAndDelete(filter);
    
    return removeFeatureValue
  }
  async update(requestId: String, feature: FeatureEntity){
    let elem = await FeatureModel.findOne({id: requestId})
    const filter = {_id: elem._id}
    let removeFeatureValue:any = await FeatureModel.updateOne(filter,  feature, {new: true});
    
    return removeFeatureValue
  }
}
