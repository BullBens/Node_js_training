import { EventCreateModel, EventModel } from "../models";
import { EventRepository } from "../repositories";
import { inject, injectable } from "inversify";
import { EventSchema } from "../schemas/event.schema";
import { model } from "mongoose";
import { ApplicationError } from "../common";

const EventModel = model("events", EventSchema);

@injectable()
export class EventService {
  constructor(
    @inject(EventRepository) private _eventRepository: EventRepository
  ) {}

  async add(event: EventCreateModel) {
    const eventEntity = await this._eventRepository.add(event);
    const eventModel: EventModel = eventEntity;
    return eventModel;
  }
  async removeById(_id: any) {
    const eventEntity = await this._eventRepository.deleteOne(_id);
    if (eventEntity.n > 0) {
      return true;
    } else {
      throw new ApplicationError(`"Event with ID ${_id} doesn't remove!`);
    }
  }
  async updateById(_id: string, data: any) {
    const eventEntity = await this._eventRepository.findByIdAndUpdate(
      _id,
      data
    );

    if (!eventEntity) {
      throw new ApplicationError(`"Event with ID ${_id} doesn't update!`);
    } else {
      return eventEntity;
    }
  }
  async getById(id: any) {
    const eventEntity = await this._eventRepository.findOne(id);
    if (!eventEntity) {
      throw new ApplicationError(`"Event with ID ${id} doesn't exist!`);
    }
    return eventEntity;
  }
}
