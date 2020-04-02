import { Router } from 'express';

import ArticleController from '../controllers/article';
import wrapAsync from './async.wrapper';

import passport = require('passport');

class ArticleRouter {
    public router!: Router;

    constructor() {
      this.router = Router();
      this.router.get('/article/:articleId', passport.authenticate('jwt', { session: false }), wrapAsync(ArticleController.getArticle));
      this.router.post('/article', passport.authenticate('jwt', { session: false }), wrapAsync(ArticleController.createArticle));
      this.router.delete('/article/:articleId', ArticleController.deleteArticle);
    }
}

export default new ArticleRouter().router;
