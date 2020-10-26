import { injectable } from "inversify";
import { model, Types } from "mongoose";

import { EventEntity } from "entities";
import { EventSchema } from "./../schemas/event.schema";

export const EventModel = model("events", EventSchema);

@injectable()
export class EventRepository {
  constructor() {}
  async add(eventEntity: EventEntity): Promise<any> {
    let result: any = await EventModel.create(eventEntity);
    return result;
  }
  async findOne(_id: string): Promise<any> {
    let result: any = await EventModel.aggregate([
      {
        $match: { _id: Types.ObjectId(_id) },
      },
      {
        $lookup: {
          from: "users",
          localField: "_author",
          foreignField: "_id",
          as: "userInfo",
        },
      },
      { $unwind: "$userInfo" },
    ]);
    return result;
  }
  async findByIdAndUpdate(_id: string, eventEntity: any): Promise<any> {
    let result = await EventModel.findByIdAndUpdate({ _id }, eventEntity, {
      new: true,
    })
      .then(async (res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });
    return result;
  }
  async deleteOne(_id: string): Promise<any> {
    let result: any = await EventModel.deleteOne({ _id });
    return result;
  }
}
