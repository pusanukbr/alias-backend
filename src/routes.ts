import { Express, Request, Response } from "express";
import { createUserHandler } from "./controller/user.controller";
import validateResource from "./middleware/validateResource";
import { createUserSchema } from "./schema/user.schema";
import {
  createUserSessionHandler,
  deleteSessionHandler,
  getUserSessionHandler,
} from "./controller/session.controller";
import { createSessionSchema } from "./schema/session.schema";
import requireUser from "./middleware/requireUser";
import { createRoomsSchema, deleteRoomsSchema, getRoomsSchema, updateRoomsSchema } from "./schema/rooms.schema";
import { createRoomsHandler, deleteRoomsHandler, getRoomsHandler, updateRoomsHandler } from "./controller/rooms.controller";

function routes(app: Express) {
  // Check server
  app.get("/healthcheck", (req: Request, res: Response) => {
    res.sendStatus(200);
  });

  // Create User
  app.post("/api/users", validateResource(createUserSchema), createUserHandler);

  // Create Session
  app.post(
    "/api/sessions",
    validateResource(createSessionSchema),
    createUserSessionHandler
  );

  // Get Session
  app.get("/api/sessions", requireUser, getUserSessionHandler);

  // Delete Session
  app.delete("/api/sessions", requireUser, deleteSessionHandler);


  app.post("/api/rooms", [requireUser, validateResource(createRoomsSchema)], createRoomsHandler);
  app.get("/api/rooms", [requireUser, validateResource(getRoomsSchema)], getRoomsHandler);
  app.put("/api/rooms", [requireUser, validateResource(updateRoomsSchema)], updateRoomsHandler);
  app.delete("/api/rooms", [requireUser, validateResource(deleteRoomsSchema)], deleteRoomsHandler);
}

export default routes;
