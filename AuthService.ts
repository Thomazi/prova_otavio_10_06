import { Prisma, PrismaClient } from '@prisma/client';
import { generateHash } from '../utils/BcryptUtils'; // Importe a função de criptografia

const prisma = new PrismaClient();

class AuthService {
  constructor() {}

  async signIn() {}

  async signUp(user: Prisma.UserCreateInput) {
    try {
      const hashPassword = await generateHash(user.password!); // Criptografe a senha
      if (hashPassword === null || hashPassword === undefined) {
        throw new Error('Erro ao criptografar senha');
      }
      const newuser = await prisma.user.create({
        data: { ...user, password: hashPassword }, // Use a senha criptografada
      });
      return newuser;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async signOut() {}
}

export default new AuthService();
