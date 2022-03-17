import { getRepository } from "typeorm";

import AppError from "../../errors/AppError";

import User from "../../models/User";

interface IRequest {
  user_admin: string;
  user_id: string;
  name: string;
  email: string;
  cpf: string;
  office: string;
}

class UpdateUserService {
  public async execute({
    user_admin,
    user_id,
    name,
    email,
    cpf,
    office,
  }: IRequest): Promise<User> {
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

    const findValidationUser = await userRespository.find();

    if (!name || !email || !cpf || !office) {
      throw new AppError("Insira os dados corretamente no formulário");
    }

    findValidationUser.filter((item) => {
      if (item.id !== user_id && item.name === name) {
        throw new AppError("Nome de usuário já está em uso!", 400);
      }

      if (item.id !== user_id && item.email === email) {
        throw new AppError("Este e-mail já está em uso!", 400);
      }

      if (item.id !== user_id && item.cpf === cpf) {
        throw new AppError("CPF já cadastrado no sistema!", 400);
      }
    });

    if (!findUser) {
      throw new AppError("Usuário não encontrado!", 400);
    }

    findUser.name = name;
    findUser.email = email;
    findUser.cpf = cpf;
    findUser.office = office;

    await userRespository.save(findUser);

    return findUser;
  }
}

export default UpdateUserService;
