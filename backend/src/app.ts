import * as express from 'express';
import * as helmet from 'helmet';
import * as morgan from 'morgan';
import * as passport from 'passport';
import * as cors from 'cors';

import passportConfig from './config/passport';

import IndexRouter from './routes/index';
import UserRouter from './routes/user';
import ArticleRouter from './routes/article';
import CommentRouter from './routes/comment';

class App {
  public app!: express.Application;

  constructor() {
    this.app = express();

    this.app.use(cors());
    this.app.use(morgan('combined'));
    this.app.use(helmet());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));

    passportConfig(passport);
    this.app.use(passport.initialize());

    this.app.use('/', IndexRouter);
    this.app.use('/', UserRouter);
    this.app.use('/', ArticleRouter);
    this.app.use('/', CommentRouter);
  }
}

export default new App().app;
