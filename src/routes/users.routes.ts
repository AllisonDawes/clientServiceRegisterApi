import { Router } from "express";

import ensureAuthenticated from "../middlewares/ensureAuthenticated";

import UsersControllers from "../controllers/UsersControllers";

const usersRouter = Router();

const usersControllers = new UsersControllers();

usersRouter.use(ensureAuthenticated);

usersRouter.get("/", usersControllers.index);
usersRouter.get("/find_users", usersControllers.show);
usersRouter.post("/", usersControllers.create);
usersRouter.put("/:user_id", usersControllers.update);
usersRouter.delete("/:user_id", usersControllers.delete);

export default usersRouter;
