import mongoose, { Error } from "mongoose";
import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import passport from "passport";
import passportLocal from "passport-local";
import cookieParser from "cookie-parser";
import session from "express-session";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

// Models
import { UserModel, User } from "./models/User.model";

// Routes
// const UserRoutes = require("./routes/UserRoutes");
import { router as UserRoutes } from "./routes/UserRoutes";

const env = dotenv.config(); // load .env value into process.env
if (env.error) {
  console.error(env.error);
} else {
  console.log("Environment loaded");
}

const LocalStrategy = passportLocal.Strategy;

const URI = process.env.MONGODB_URI;

mongoose.connect(
  URI!,
  {
    // arbitrary options to avoid an error
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err: Error) => {
    if (err) console.error(err);
    else console.log("Connected to MongoDB");
  }
);

// Middleware
const app = express();
app.use(express.json());
app.use(cors({ origin: false, credentials: true }));
app.use(
  session({ secret: "secretcode", resave: true, saveUninitialized: true })
);
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

app.use("/", UserRoutes); // import user routes

// Passport
passport.use(
  new LocalStrategy((username: string, password: string, done) => {
    UserModel.findOne({ username: username }, (err, user: User) => {
      if (err) return console.error(err);
      if (!user) return done(null, false);
      bcrypt.compare(password, user.password, (err, result: boolean) => {
        if (err) return console.error(err);
        if (result === true) return done(null, user);
        else return done(null, false);
      });
    });
  })
);

passport.serializeUser((user: User, done) => {
  done(null, user._id);
});
passport.deserializeUser((_id: string, done) => {
  UserModel.findById(_id, (err, user: User) => {
    if (err) return console.error(err);
    done(null, user);
  });
});

app.get("/", function (req, res) {
  console.log(req.session);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server started successfully on port ${PORT}`);
});
