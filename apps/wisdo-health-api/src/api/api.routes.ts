import { Router } from 'express';
import { createPostController } from './controllers/post.controllers';

export const apiRouter = Router();

apiRouter.post('/post', createPostController);
