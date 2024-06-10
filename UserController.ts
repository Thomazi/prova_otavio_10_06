import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { generateHash } from '../utils/BcryptUtils';

const prisma = new PrismaClient();

class UserController {
  constructor() {}

  async listUsers(req: Request, res: Response) {
    try {
      const users = await prisma.user.findMany(); 
      res.json({
        status: 'ok',
        users: users,
      });
    } catch (error) {
      console.log(error);
      res.json({
        status: 'error',
        message: (error as Error).message || 'Erro ao listar os usuários', 
      });
    }
  }

  async createUser(req: Request, res: Response) {
    const { name, email, password } = req.body; 
    if (!email || !name || !password) {
      res.json({
        status: 'error',
        message: 'Faltam parâmetros',
      });
      return;
    }

    try {
      const hashPassword = await generateHash(password); 
      if (!hashPassword) {
        throw new Error('Erro ao criptografar senha');
      }

      const newUser = await prisma.user.create({ 
        data: {
          name: name,
          email: email,
          password: hashPassword,
        },
      });

      res.json({
        status: 'ok',
        newUser: newUser,
      });
    } catch (error) {
      console.log(error);
      res.json({
        status: 'error',
        message: (error as Error).message || 'Erro ao criar o usuário', 
      });
    }
  }

  async updateUser(req: Request, res: Response) {
    const id = req.params.id;
    if (!id) {
      res.json({
        status: 'error',
        message: 'Falta o ID',
      });
      return;
    }

    const { name, email } = req.body;
    if (!email || !name) {
      res.json({
        status: 'error',
        message: 'Faltam parâmetros',
      });
      return;
    }

    try {
      const updatedUser = await prisma.user.update({ 
        where: {
          id: id,
        },
        data: {
          name: name,
          email: email,
        },
      });

      res.json({
        status: 'ok',
        updatedUser: updatedUser,
      });
    } catch (error) {
      console.log(error);
      res.json({
        status: 'error',
        message: (error as Error).message || 'Erro ao atualizar o usuário', 
      });
    }
  }

  async deleteUser(req: Request, res: Response) {
    const id = req.params.id;
    if (!id) {
      res.json({
        status: 'error',
        message: 'Falta o ID',
      });
      return;
    }

    try {
      await prisma.user.delete({ 
        where: {
          id: id,
        },
      });

      res.json({
        status: 'ok',
        message: 'Usuário deletado com sucesso',
      });
    } catch (error) {
      console.log(error);
      res.json({
        status: 'error',
        message: (error as Error).message || 'Erro ao deletar o usuário', 
      });
    }
  }
}

export default new UserController();
