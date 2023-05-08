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
}

export default routes;
