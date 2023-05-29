import { Request, Response } from "express";
import { CreateRoomsInput, DeleteRoomsInput, GetRoomsInput, UpdateRoomsInput } from "../schema/rooms.schema";
import { createRooms, deleteRooms, findAndUpdateRooms, findRooms } from "../service/rooms.service";

export async function createRoomsHandler(req: Request<{}, {}, CreateRoomsInput['body']>, res: Response) {
  const userId = res.locals.user._id;
  const body = req.body;
  const rooms = await createRooms({ ...body, user: userId });

  return res.send(rooms);
}

export async function updateRoomsHandler(req: Request<UpdateRoomsInput['params']>, res: Response) {
  const userId = res.locals.user._id;

  const roomsId = req.params.roomsId;
  const update = req.body;

  const rooms = await findRooms({ roomsId });

  if (!rooms) return res.sendStatus(404);

  if (rooms.user !== userId) res.sendStatus(403);

  const updateRooms = await findAndUpdateRooms({ roomsId }, update, { new: true });

  return res.send(updateRooms);
}

export async function getRoomsHandler(req: Request<GetRoomsInput['params']>, res: Response) {
  const roomsId = req.params.roomsId;
  const rooms = await findRooms({ roomsId });

  if (!rooms) {
    return res.sendStatus(404);
  }

  return res.send(rooms);
}

export async function deleteRoomsHandler(req: Request<DeleteRoomsInput['params']>, res: Response) {
  const userId = res.locals.user._id;

  const roomsId = req.params.roomsId;
  const update = req.body;

  const rooms = await findRooms({ roomsId });

  if (!rooms) return res.sendStatus(404);

  if (rooms.user !== userId) res.sendStatus(403);

  await deleteRooms({ roomsId });

  return res.sendStatus(200);
}