import { Router } from 'express';
import * as passport from 'passport';
import IndexController from '../controllers';


class IndexRouter {
  public router!: Router;

  constructor() {
    this.router = Router();

    this.router.get('/', passport.authenticate('jwt', { session: false }), IndexController.index);
  }
}

export default new IndexRouter().router;
