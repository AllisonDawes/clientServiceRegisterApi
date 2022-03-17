import { getRepository } from "typeorm";

import AppError from "../../errors/AppError";

import User from "../../models/User";

interface IRequest {
  user_admin: string;
  user_id: string;
}

class DeleteUserService {
  public async execute({ user_admin, user_id }: IRequest): Promise<void> {
    const userRespository = getRepository(User);

    const findUserAdmin = await userRespository.findOne({
      where: { id: user_admin, admin: true },
    });

    if (!findUserAdmin) {
      throw new AppError("Usuário não permitido!", 400);
    }

    const findUser = await userRespository.findOne({
      where: { id: user_id },
    });

    if (!findUser) {
      throw new AppError("Usuário não encontrado!", 400);
    }

    await userRespository.remove(findUser);

    return;
  }
}

export default DeleteUserService;
