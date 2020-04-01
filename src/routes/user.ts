import { Router } from 'express';

import UserController from '../controllers/user';
import wrapAsync from './async.wrapper';

class UserRouter {
  public router!: Router;

  constructor() {
    this.router = Router();
    this.router.post('/register', wrapAsync(UserController.postRegister));
    this.router.post('/login', wrapAsync(UserController.postLogin));

    this.router.get('/logout', UserController.logout);
  }
}

export default new UserRouter().router;
