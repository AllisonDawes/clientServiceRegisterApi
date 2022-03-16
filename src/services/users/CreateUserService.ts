import { getRepository } from "typeorm";
import { hash } from "bcryptjs";

import AppError from "../../errors/AppError";

import User from "../../models/User";

interface IRequest {
  name: string;
  email: string;
  cpf: string;
  password: string;
}

class CreateUserService {
  public async execute({
    name,
    email,
    cpf,
    password,
  }: IRequest): Promise<User> {
    const userRepository = getRepository(User);

    const findUser = await userRepository.find();

    if (!name || !email || !cpf || !password) {
      throw new AppError("Insira os dados corretamente no formulário");
    }

    findUser.filter((item) => {
      if (item.name === name) {
        throw new AppError("Nome de usuário já está em uso!", 400);
      }

      if (item.email === email) {
        throw new AppError("Este e-mail já está em uso!", 400);
      }

      if (item.cpf === cpf) {
        throw new AppError("CPF já cadastrado no sistema!", 400);
      }
    });

    const passwordHashed = await hash(password, 8);

    const user = userRepository.create({
      name,
      email,
      cpf,
      admin: false,
      password: passwordHashed,
    });

    await userRepository.save(user);

    return user;
  }
}

export default CreateUserService;
