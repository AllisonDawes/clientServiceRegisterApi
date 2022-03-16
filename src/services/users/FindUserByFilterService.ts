import { getRepository, ILike } from "typeorm";

import AppError from "../../errors/AppError";

import User from "../../models/User";

interface IRequest {
  user_id: string;
  search_user: string;
}

class FindUserByFilterService {
  public async execute({
    user_id,
    search_user,
  }: IRequest): Promise<User[] | undefined> {
    const userRepository = getRepository(User);

    const user_admin = await userRepository.findOne({
      where: { id: user_id, admin: true },
    });

    if (!user_admin) {
      throw new AppError("Usuário não permitido!", 400);
    }

    const findUserName = await userRepository.find({
      where: { name: ILike(`%${search_user}%`) },
      order: { name: "ASC" },
    });

    const findUserEmail = await userRepository.find({
      where: { email: ILike(`%${search_user}%`) },
      order: { name: "ASC" },
    });

    const findUserCpf = await userRepository.find({
      where: { cpf: ILike(`%${search_user}%`) },
      order: { name: "ASC" },
    });

    if (findUserName.length > 0) {
      const user = findUserName;

      return user;
    } else if (findUserEmail.length > 0) {
      const user = findUserEmail;

      return user;
    } else if (findUserCpf.length > 0) {
      const user = findUserCpf;

      return user;
    }

    return;
  }
}

export default FindUserByFilterService;
