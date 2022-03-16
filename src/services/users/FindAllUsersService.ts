import { getRepository } from "typeorm";
import AppError from "../../errors/AppError";

import User from "../../models/User";

interface IRequest {
  user_id: string;
}

class FindAllUsersService {
  public async execute({ user_id }: IRequest): Promise<User[]> {
    const usersRepository = getRepository(User);

    const user_admin = await usersRepository.findOne({
      where: { id: user_id, admin: true },
    });

    if (!user_admin) {
      throw new AppError("Usuário não permitido!", 400);
    }

    const findUsers = await usersRepository.find();

    return findUsers;
  }
}

export default FindAllUsersService;
