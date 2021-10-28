const get404 = (req, res, next) => {
  res.status(404).render("pages/404.ejs", {
    pageTitle: "TrainingLog: 404",
  });
};

const get500 = (error, req, res, next) => {
  console.log(error);
  res.status(500).render("pages/500.ejs", {
    pageTitle: "TrainingLog: 500",
    error: error.message,
  });
};

module.exports = {
  get404,
  get500,
};
