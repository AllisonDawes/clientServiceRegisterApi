import { Request, Response } from "express";
import { classToPlain } from "class-transformer";

import AuthenticateUserService from "../services/auth/AuthenticateUserService";

class SessionController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const authenticateUser = new AuthenticateUserService();

    const user = await authenticateUser.execute({
      email,
      password,
    });

    return response.status(200).json(classToPlain(user));
  }
}

export default SessionController;
