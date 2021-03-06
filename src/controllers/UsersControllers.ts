import { Request, Response } from "express";
import { classToPlain } from "class-transformer";

import CreateUserService from "../services/users/CreateUserService";
import FindAllUsersService from "../services/users/FindAllUsersService";
import FindUserByFilterService from "../services/users/FindUserByFilterService";
import UpdateUserService from "../services/users/UpdateUserService";
import DeleteUserService from "../services/users/DeleteUserService";

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
    const admin_id = request.user.id;
    const { name, email, cpf, office, password } = request.body;

    const createUser = new CreateUserService();

    const user = await createUser.execute({
      admin_id,
      name,
      email,
      cpf,
      office,
      password,
    });

    return response.status(200).json(classToPlain(user));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const user_admin = request.user.id;
    const { user_id } = request.params;
    const { name, email, cpf, office } = request.body;

    const updateUser = new UpdateUserService();

    const user = await updateUser.execute({
      user_admin,
      user_id,
      name,
      email,
      cpf,
      office,
    });

    return response.status(200).json(classToPlain(user));
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const user_admin = request.user.id;
    const { user_id } = request.params;

    const deleteUser = new DeleteUserService();

    await deleteUser.execute({
      user_admin,
      user_id,
    });

    return response.status(200).json();
  }
}

export default UsersControllers;
