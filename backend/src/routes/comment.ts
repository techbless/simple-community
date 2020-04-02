import { Router } from 'express';
import * as passport from 'passport';
import wrapAsync from './async.wrapper';

import CommentController from '../controllers/comment';

class CommentRouter {
  public router!: Router;

  constructor() {
    this.router = Router();

    this.router.get(
      '/articles/:articleId/comments',
      passport.authenticate('jwt', { session: false }),
      wrapAsync(CommentController.getComments),
    );

    this.router.post(
      '/articles/:articleId/comments',
      passport.authenticate('jwt', { session: false }),
      wrapAsync(CommentController.createComment),
    );

    this.router.delete(
      '/articles/:articleId/comments/:commentId',
      passport.authenticate('jwt', { session: false }),
      wrapAsync(CommentController.deleteComment),
    );
  }
}


export default new CommentRouter().router;
