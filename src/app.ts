import * as express from 'express';
import * as helmet from 'helmet';
import * as passport from 'passport';

import passportConfig from './config/passport';

import IndexRouter from './routes/index';
import UserRouter from './routes/user';

class App {
  public app!: express.Application;

  constructor() {
    this.app = express();

    this.app.set('view engine', 'ejs');
    this.app.set('views', `${__dirname}/views`);

    // Prevent Security Issues
    // this.app.disable('x-powered-by');
    this.app.use(helmet());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));

    passportConfig(passport);
    this.app.use(passport.initialize());

    this.app.use('/', IndexRouter);
    this.app.use('/', UserRouter);
  }
}

export default new App().app;
