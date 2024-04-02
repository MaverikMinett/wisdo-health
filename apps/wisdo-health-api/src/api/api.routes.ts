import { Router } from 'express';
import { createPostController } from './controllers/post.controllers';
import { getFeedController } from './controllers/feed.controllers';

export const apiRouter = Router();

apiRouter.post('/post', createPostController);

apiRouter.get('/feed', getFeedController);