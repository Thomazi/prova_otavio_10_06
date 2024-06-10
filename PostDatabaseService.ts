import { Prisma, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class PostDataBaseService {
  constructor() {}

  async listDBPosts() {
    try {
      return await prisma.post.findMany();
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async insertDBPost(post: Prisma.PostCreateInput) {
    try {
      const newpost = await prisma.post.create({
        data: post,
      });
      return newpost;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async updateDBPost(post: Prisma.PostUpdateInput, id: string) {
    try {
      const updatedPost = await prisma.post.update({
        data: post,
        where: {
          id: id,
        },
      });
      return updatedPost;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async deleteDBPost(id: string) {
    try {
      await prisma.post.delete({
        where: {
          id: id,
        },
      });
      return true;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}

export default new PostDataBaseService();