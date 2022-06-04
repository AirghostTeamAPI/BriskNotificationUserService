import bodyParser from "body-parser";
import express from "express";
import connectDB from "../config/database";
import { importUserCsvFile } from './scripts/User';
import passport from 'passport';
import BearerStrategy from 'passport-http-bearer';
import User from "./models/User";
import jwt from 'jsonwebtoken';
import { IUser } from './interface/user';
import cors from 'cors';
import { createHours } from "./scripts/Access";
import dotenv from 'dotenv';
dotenv.config();

const app = express();
connectDB();

app.set("port", process.env.PORT || 5001);
app.set("jwt", process.env.jwtSecret || 5000);
app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(passport.initialize());

passport.use(new BearerStrategy(
  function (token, done) {
    const user = jwt.verify(token, process.env.jwtSecret) as IUser

    User.findOne({ login: user.login }, function (err, user) {
      if (err) { return done(err); }
      if (!user) { return done(null, false); }
      return done(null, user, { scope: 'all' });
    });
  }
));

import USER from './routes/api/User';
app.use("/api", USER);
import ACCESS from './routes/api/Access';
app.use("/api", ACCESS);

const port = app.get("port");
const server = app.listen(port, () =>
  console.log(`Server started on port ${port}`)
);

importUserCsvFile()
createHours()

setInterval(function () {
  console.log('Syncing Spreadsheets...');
  importUserCsvFile()
}, 60 * 1000); // 60 * 1000 milsec

export default server;
