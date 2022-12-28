import passport from "passport";
import * as strategy from "../passport/strategy.js";
import { Strategy as LocalStrategy } from "passport-local";
import { User } from "../models/user.js";

const init = () => {
  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser(async (id, done) => {
    //User.findById(id, (err, user) =>
    const user = await User.findById(id);
    done(err, user);

    passport.use(
      "login",
      new LocalStrategy(
        {
          passReqToCallback: true,
        },
        async (req, username, password, cb) => {
          await User.findOne({ username: username }, (err, user) => {
            if (err) return cb(err);
            if (!user) {
              console.log("User not found with the username: " + username);
              return cb(null, false);
            }
            if (!validatePassword(user, password)) {
              console.log("Invalid password.");
              return cb(null, false);
            }
            return cb(null, user);
          });
        }
      )
    );

    passport.use(
      "signup",
      new LocalStrategy(
        {
          passReqToCallback: true,
        },
        async (req, username, password, cb) => {
          await User.findOne({ username: username }, (err, user) => {
            if (err) {
              console.log("Error in signup: " + err);
              return cb(err);
            }
            if (user) {
              console.log("User already exists.");
              return cb(null, false);
            } else {
              const newUser = new User();
              newUser.username = username;
              newUser.password = createHash(password);
              newUser
                .save()
                .then((datos) => cb(null, datos))
                .catch(null, false);
            }
          });
        }
      )
    );
  });
};

export const PassportAuth = {
  init,
};
