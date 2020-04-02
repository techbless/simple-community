import { Router } from 'express';

import ArticleController from '../controllers/article';
import wrapAsync from './async.wrapper';

import passport = require('passport');

class ArticleRouter {
    public router!: Router;

    constructor() {
      this.router = Router();

      this.router.get(
        '/articles/',
        passport.authenticate('jwt', { session: false }),
        wrapAsync(ArticleController.getArticles),
      );

      this.router.get(
        '/articles/:articleId',
        passport.authenticate('jwt', { session: false }),
        wrapAsync(ArticleController.getArticle),
      );

      this.router.post(
        '/articles',
        passport.authenticate('jwt', { session: false }),
        wrapAsync(ArticleController.createArticle),
      );

      this.router.delete(
        '/articles/:articleId',
        passport.authenticate('jwt', { session: false }),
        wrapAsync(ArticleController.deleteArticle),
      );
    }
}

export default new ArticleRouter().router;
