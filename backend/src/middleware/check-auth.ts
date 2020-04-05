import { Request, Response, NextFunction } from "express";
import * as passport from 'passport';
import User from "../models/user";

export const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate('jwt', { session: false }, (err: Error, user: User) => {
        if(err) return res.sendStatus(500);
        if(!user) return res.sendStatus(401);
        
        req.user = user;
        next();
    })(req, res, next);
}