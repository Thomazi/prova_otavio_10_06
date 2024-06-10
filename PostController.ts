import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class PostController {
  constructor() {}

  async listPosts(_: Request, res: Response) { 
    try {
      const posts = await prisma.post.findMany(); 
      res.json({
        status: 'ok',
        posts: posts,
      });
    } catch (error) {
      console.log(error);
      res.json({
        status: 'error',
        message: (error as Error).message || 'Erro ao buscar os posts', 
      });
    }
  }

  async createPost(req: Request, res: Response) {
    const { title, content, published, authorId } = req.body;

    if (!title || !content || !published || !authorId) {
      res.json({
        status: 'error',
        message: 'Faltam parâmetros',
      });
      return;
    }

    try {
      const newPost = await prisma.post.create({
        data: {
          title: title,
          content: content,
          published: published,
          authorId: authorId,
        },
      });

      res.json({
        status: 'ok',
        newPost: newPost,
      });
    } catch (error) {
      console.log(error);
      res.json({
        status: 'error',
        message: (error as Error).message || 'Erro ao criar o post', 
      });
    }
  }

  async updatePost(req: Request, res: Response) {
    const id = req.params.id;
    const { title, content, published } = req.body;

    if (!id || !title || !content || published === undefined) {
      res.json({
        status: 'error',
        message: 'Faltam parâmetros',
      });
      return;
    }

    try {
      const updatedPost = await prisma.post.update({
        where: {
          id: id,
        },
        data: {
          title: title,
          content: content,
          published: published,
        },
      });

      res.json({
        status: 'ok',
        updatedPost: updatedPost,
      });
    } catch (error) {
      console.log(error);
      res.json({
        status: 'error',
        message: (error as Error).message || 'Erro ao atualizar o post', // Tipo cast para 'Error'
      });
    }
  }

  async deletePost(req: Request, res: Response) {
    const id = req.params.id;
    if (!id) {
      res.json({
        status: 'error',
        message: 'Faltou o ID',
      });
      return;
    }

    try {
      await prisma.post.delete({
        where: {
          id: id,
        },
      });

      res.json({
        status: 'ok',
        message: 'Post deletado com sucesso',
      });
    } catch (error) {
      console.log(error);
      res.json({
        status: 'error',
        message: (error as Error).message || 'Erro ao deletar o post', 
      });
    }
  }
}

export default new PostController();
