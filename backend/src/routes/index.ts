import { Router } from 'express';
import * as passport from 'passport';
import IndexController from '../controllers';
import { isAuthenticated } from '../middleware/check-auth';


class IndexRouter {
  public router!: Router;

  constructor() {
    this.router = Router();

    this.router.get('/', 
      isAuthenticated,
      IndexController.index
    );
  }
}

export default new IndexRouter().router;
