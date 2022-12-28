import { Router } from "express";
import passport from "passport";
import Authenticated from "../middlewares/authenticate.js"

const passportAuthsRouter = Router();

// get

passportAuthsRouter.get("/signup-error", (req, res) => {
  res.render("signup-error", {});
});
passportAuthsRouter.get("/login-error", (req, res) => {
  res.render("login-error", {})
});

passportAuthsRouter.get("/signup", (req, res) => {
  res.render("signup");
});

passportAuthsRouter.get("/logout", (req, res) => {
  const { username } = req.user;
  req.logout((err)=>{
    if(err){return err}
    res.render('logout', {username})
  })  
  /* req.logout();
  res.render("logout", { username }); */
});

passportAuthsRouter.get("/login", Authenticated, (req, res) => {
  res.render("login");
});
passportAuthsRouter.get("/", Authenticated, (req, res) => {
  res.redirect("login");
});

//post

passportAuthsRouter.post(
  "/login",
  passport.authenticate("login", { failureRedirect: "/login-error" }),
  (req, res) => {
    res.redirect("/");
  }
);

passportAuthsRouter.post(
  "/signup",
  passport.authenticate("signup", { failureRedirect: "/signup-error" }),
  (req, res) => {
    res.redirect("/");
  }
);

export default passportAuthsRouter;
