import { Request, Response } from "express";
import { classToPlain } from "class-transformer";

import CreateUserService from "../services/users/CreateUserService";
import FindAllUsersService from "../services/users/FindAllUsersService";
import FindUserByFilterService from "../services/users/FindUserByFilterService";

class UsersControllers {
  public async index(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const findAllUsers = new FindAllUsersService();

    const users = await findAllUsers.execute({
      user_id,
    });

    return response.status(200).json(classToPlain(users));
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { search_user } = request.query;

    const findUserByFilter = new FindUserByFilterService();

    const user = await findUserByFilter.execute({
      user_id,
      search_user: String(search_user),
    });

    return response.status(200).json(classToPlain(user));
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, cpf, password } = request.body;

    const createUser = new CreateUserService();

    const user = await createUser.execute({
      name,
      email,
      cpf,
      password,
    });

    return response.status(200).json(classToPlain(user));
  }
}

export default UsersControllers;
