import * as jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { IVerifyOptions } from 'passport-local';
import * as passport from 'passport';

import User from '../models/user';


class UserController {
  public postLogin = (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate('local', (err: Error, user: User, info: IVerifyOptions) => {
      if (err) { return next(err); }
      if (!user) { return res.redirect('/login'); }

      // eslint-disable-next-line no-shadow
      req.logIn(user, { session: false }, (err) => {
        if (err) { return next(err); }

        const payload = {
          id: user.userId,
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: 3600 });

        res.json({ user, token });
      });
    })(req, res, next);
  }

  public postRegister = async (req: Request, res: Response) => {
    const result: User = await User.create({
      userName: req.body.username,
      email: req.body.email,
      password: req.body.password,
      firstName: req.body.firstname,
      lastName: req.body.lastname,
    });

    res.json(result);
  }
}

export default new UserController();
