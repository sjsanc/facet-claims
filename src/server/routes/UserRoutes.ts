import express, { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { User, UserModel } from "../models/User.model";
import { checkAdmin } from "../middleware/isAdmin";
import passport from "passport";

export const router = express.Router();

router.get("/", (req, res) => {
  res.send("Hi");
});

router.post("/register", async (req: Request, res: Response) => {
  const body: User = req?.body;
  console.log(req.user);

  UserModel.findOne(
    { username: body.username },
    async (err: Error, user: User) => {
      if (err) console.error(err);
      else if (user) res.send("User already exists");
      else if (!user) {
        body.password = await bcrypt.hash(body.password, 10);
        const newUser = new UserModel(body);
        await newUser.save();
        res.sendStatus(200);
        console.log("New user created: " + req.body.username);
      }
    }
  );
});

router.get("/getallusers", checkAdmin, async (req, res) => {
  await UserModel.find({}, (err: Error, listOfUsers: User[]) => {
    if (err) console.error(err);
    res.send(listOfUsers);
  });
});

router.post("/login", passport.authenticate("local"), (req, res) => {
  res.sendStatus(200);
});

router.get("/logout", (req, res) => {
  req.logout();
  res.sendStatus(200);
});

router.get("/getcurrentuser", (req, res) => {
  if (req.user === undefined) console.error("No user logged in");
  else res.send(req.user);
});
