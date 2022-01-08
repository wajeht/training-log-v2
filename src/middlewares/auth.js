const User = require("../models/user.model.js");
const { env } = require("../../config/config.js");

const localVariables = async (req, res, next) => {
  const authMessages = {
    error: req.flash("error"),
    success: req.flash("success"),
    warning: req.flash("warning"),
  };

  res.locals.csrfToken = req.csrfToken();
  res.locals.isAuthenticated = req.session.isLoggedIn;
  res.locals.authMessages = authMessages;
  res.locals.env = env;

  let user;

  // since this runs on every request
  // this will fetch the latest info
  // about user. fixed form setting
  // update page.
  if (req.session.user) {
    const { id } = req.session.user;
    [user] = await User.getUserDetailsById(id);
  }

  res.locals.user = user;

  next();
};

const loginRequired = (req, res, next) => {
  if (!req.session.isLoggedIn) {
    req.flash("warning", "you must sign in!");
    return res.redirect("/signin");
  }
  next();
};

const isLoggedIn = (req, res, next) => {
  if (req.session.isLoggedIn) {
    return res.redirect("/");
  }
  next();
};

module.exports = { localVariables, loginRequired, isLoggedIn };
