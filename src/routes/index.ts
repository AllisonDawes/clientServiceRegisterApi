import { Router } from "express";

import usersRoutes from "./users.routes";
import sessionRouter from "./session.routes";

const routes = Router();

routes.use("/users", usersRoutes);
routes.use("/sessions", sessionRouter);

export default routes;
