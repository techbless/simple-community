import { Router } from 'express';
import * as passport from 'passport';
import wrapAsync from './async.wrapper';

import CommentController from '../controllers/comment';
import { isAuthenticated } from '../middleware/check-auth';

class CommentRouter {
  public router!: Router;

  constructor() {
    this.router = Router();

    this.router.get(
      '/articles/:articleId/comments',
      isAuthenticated,
      wrapAsync(CommentController.getComments),
    );

    this.router.post(
      '/articles/:articleId/comments',
      isAuthenticated,
      wrapAsync(CommentController.createComment),
    );

    this.router.delete(
      '/articles/:articleId/comments/:commentId',
      isAuthenticated,
      wrapAsync(CommentController.deleteComment),
    );
  }
}


export default new CommentRouter().router;
