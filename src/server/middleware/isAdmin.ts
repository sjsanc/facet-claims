import { Request, Response, NextFunction } from "express";
import { User, UserModel } from "../models/User.model";

export const checkAdmin = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { user }: any = req;
  if (user) {
    UserModel.findById(user._id, (err, user: User) => {
      if (err) console.error(err);
      if (user.isAdmin) {
        next();
      } else {
        res.send("Unauthorised access from " + user.username);
      }
    });
  } else {
    res.send("You are not logged in");
  }
};
