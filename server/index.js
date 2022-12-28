// init project
import express from "express";
import cookieParser from "cookie-parser";
import session from "express-session";
import MongoStore from "connect-mongo";
import handlebars from "express-handlebars";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import {
  infoRouter,
  passportAuthsRouter,
  productsTestRouter,
} from "./routes/index.js";
import { User } from "./models/user.js";
import * as strategy from "./passport/strategy.js";
import minimist from "minimist";

const args = minimist(process.argv.slice(2), {
  alias: {
    p: "PORT",
  },
  default: {
    p: 8080,
  },
});

const { PORT } = args;

import { initServer } from "./socket.js";
import http from "http";
import bodyParser from "body-parser";

const app = express();

app.use(cookieParser());
app.use(
  session({
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URL,
      ttl: 600,
    }),
    secret: "secretkey",
    resave: false,
    saveUninitialized: false,
    rolling: false,
    cookie: {
      maxAge: 600000,
    },
  })
);
app.engine(
  "hbs",
  handlebars.engine({ extname: ".hbs", defaultLayout: "main.hbs" })
);
app.set("view engine", "hbs");
app.set("views", "./views");
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("./public"));

app.use("/", passportAuthsRouter);
app.use("/api", productsTestRouter);
app.use("/info", infoRouter);

passport.use(
  "login",
  new LocalStrategy({ passReqToCallback: true }, strategy.login)
);

passport.use(
  "signup",
  new LocalStrategy({ passReqToCallback: true }, strategy.signup)
);

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => done(err, user));
});

app.use((error, req, res, next) => {
  if (error.statusCode) {
    return res.status(error.statusCode).send(`Error ${error.statusCode}`);
  }
  console.log(error);
  res.status(500).json({ error: "Somethings brokes..." });
});

// listen for requests :)
const server = http.createServer(app);
initServer(server);

server.listen(PORT, async () => {
  console.log("Your app is listening on " + `${process.env.NODE_URL}:${PORT}/`);
  console.log("Environment: " + process.env.NODE_ENV);
});
