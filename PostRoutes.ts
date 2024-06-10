import { Router } from 'express';
import PostController from '../controllers/PostController';

const PostRouter = Router();

PostRouter.get('/api/posts', PostController.listPosts);

PostRouter.post('/api/post', PostController.createPost);

PostRouter.patch('/api/post/:id', PostController.updatePost);

PostRouter.delete('/api/post/:id', PostController.deletePost);

export default PostRouter;