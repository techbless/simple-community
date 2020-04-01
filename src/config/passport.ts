import { PassportStatic } from 'passport';
import * as passportLocal from 'passport-local';
import * as passportJWT from 'passport-jwt';

import User from '../models/user';

export default (passport: PassportStatic) => {
  const LocalStrategy = passportLocal.Strategy;
  const JWTStratey = passportJWT.Strategy;
  const ExtractJWT = passportJWT.ExtractJwt;

  passport.serializeUser(async (user: User, done) => {
    done(null, user.userId);
  });

  passport.deserializeUser(async (id: number, done) => {
    const user = await User.findOne({
      where: {
        userId: id,
      },
    });

    done(null, user);
  });

  passport.use(
    new LocalStrategy(async (username, password, done) => {
      const user = await User.findOne({
        where: {
          userName: username,
        },
      });

      if (!user) {
        return done(null, false, { message: 'Incorrect username' });
      }

      if (user.password !== password) {
        return done(null, false, { message: 'Incorrect password' });
      }

      return done(null, user);
    }),
  );

  passport.use(
    new JWTStratey({
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    },
    async (jwtPayload, done) => {
      const user = await User.findOne({
        where: {
          userId: jwtPayload.id,
        },
      });

      if (!user) {
        return done(null, false);
      }

      return done(null, user);
    }),
  );
};
