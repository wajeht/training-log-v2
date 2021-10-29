const { env } = require("../../config/config.js");

const get404 = (req, res, next) => {
  res.status(404).render("pages/404.ejs", {
    pageTitle: "TrainingLog: 404",
  });
};

const get500 = (error, req, res, next) => {
  const errorConfig = {
    message: env == "development" ? "" : "Internal Server Error",
    stack:
      env == "development"
        ? error.stack
        : "The server encountered an internal error or misconfiguration and was unable to complete your request.",
  };

  res.status(500).render("pages/500.ejs", {
    pageTitle: "TrainingLog: 500",
    error: errorConfig,
  });
};

module.exports = {
  get404,
  get500,
};
