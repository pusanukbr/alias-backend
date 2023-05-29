import mongoose from "mongoose";
import {customAlphabet} from "nanoid";
import { UserDocument } from "./user.model";

const nanoid = customAlphabet('abcdefghijklmnopqrstuvwxyz0123456789', 10);

export interface RoomsDocument extends mongoose.Document {
  user: UserDocument["_id"];
  createAt: Date,
  updatedAt: Date
}

const roomsSchema = new mongoose.Schema(
  {
    roomsId: {
      type: String,
      required: true,
      unique: true,
      default: () => `rooms_${nanoid()}`,
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  }
);

const RoomsModel = mongoose.model<RoomsDocument>(
  "RoomsModel",
  roomsSchema
);

export default RoomsModel;
