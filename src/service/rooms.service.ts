import { DocumentDefinition, FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import RoomsModel, { RoomsDocument } from "../models/rooms.models";

export async function createRooms(input: DocumentDefinition<Omit<RoomsDocument, "createAt" | "updatedAt">>) {
  return RoomsModel.create(input);
}

export async function findRooms(query: FilterQuery<RoomsDocument>, options: QueryOptions = {
  lean: true
}) {
  return RoomsModel.findOne(query, {}, options);
}

export async function findAndUpdateRooms(query: FilterQuery<RoomsDocument>, update: UpdateQuery<RoomsDocument>, options: QueryOptions) {
  return RoomsModel.findOneAndUpdate(query, update, options)
}

export async function deleteRooms(query: FilterQuery<RoomsDocument>) {
  return RoomsModel.deleteOne(query);
}
