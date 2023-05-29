import { object, string, number, TypeOf } from 'zod';
const payload = {
  body: object({})
}

const params = {
  params: object({
    roomsId: string({
      required_error: " roomsId is required"
    })
  })
}

export const createRoomsSchema = object({
  ...payload
});

export const updateRoomsSchema = object({
  ...payload,
  ...params
});

export const getRoomsSchema = object({
  ...params
});

export const deleteRoomsSchema = object({
  ...params
});

export type CreateRoomsInput = TypeOf<typeof createRoomsSchema>
export type UpdateRoomsInput = TypeOf<typeof updateRoomsSchema>
export type GetRoomsInput = TypeOf<typeof getRoomsSchema>
export type DeleteRoomsInput = TypeOf<typeof deleteRoomsSchema>