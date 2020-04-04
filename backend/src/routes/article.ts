import { Router } from 'express';

import ArticleController from '../controllers/article';
import wrapAsync from './async.wrapper';

import passport = require('passport');
import { isAuthenticated } from '../middleware/check-auth';

class ArticleRouter {
    public router!: Router;

    constructor() {
      this.router = Router();

      this.router.get(
        '/articles/',
        isAuthenticated,
        wrapAsync(ArticleController.getArticles),
      );

      this.router.get(
        '/articles/:articleId',
        isAuthenticated,
        wrapAsync(ArticleController.getArticle),
      );

      this.router.post(
        '/articles',
        isAuthenticated,
        wrapAsync(ArticleController.createArticle),
      );

      this.router.delete(
        '/articles/:articleId',
        isAuthenticated,
        wrapAsync(ArticleController.deleteArticle),
      );
    }
}

export default new ArticleRouter().router;
