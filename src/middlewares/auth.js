const localVariables = (req, res, next) => {
  res.locals.csrfToken = req.csrfToken();
  res.locals.isAuthenticated = req.session.isLoggedIn;
  res.locals.user = req.session.user;
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
