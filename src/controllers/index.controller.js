const Video = require("../models/video.model.js");
const User = require("../models/user.model.js");

const getIndex = async (req, res, next) => {
  try {
    // hide home page after login
    // redirect them to videos page
    if (req.session.isLoggedIn) {
      return res.redirect("/videos");
    }

    const videosPerPage = 8;
    const page = req.query.page || 1;

    let [count] = await Video.countAllVideos();
    count = Number.parseInt(count.count);

    const videos = await Video.getAllVideosWithUserDetails(videosPerPage, page);

    res.render("pages/home.ejs", {
      pageTitle: "TrainingLog",
      videos,
      current: page,
      pages: Math.ceil(count / videosPerPage),
    });
  } catch (err) {
    next(err);
  }
};

const getContact = (req, res, next) => {
  try {
    res.render("pages/contact.ejs", {
      pageTitle: "TrainingLog: Contact",
    });
  } catch (err) {
    next(err);
  }
};

const getFaq = (req, res, next) => {
  try {
    res.render("pages/faq.ejs", {
      pageTitle: "TrainingLog: Faq",
    });
  } catch (err) {
    next(err);
  }
};

const getTerms = (req, res, next) => {
  try {
    res.render("pages/terms.ejs", {
      pageTitle: "TrainingLog: Terms",
    });
  } catch (err) {
    next(err);
  }
};

const getPrivacy = (req, res, next) => {
  try {
    res.render("pages/privacy.ejs", {
      pageTitle: "TrainingLog: Privacy",
    });
  } catch (err) {
    next(err);
  }
};

const getAbout = (req, res, next) => {
  try {
    res.render("pages/about.ejs", {
      pageTitle: "TrainingLog: About",
    });
  } catch (err) {
    next(err);
  }
};

const getSettings = async (req, res, next) => {
  const { id } = req.session.user;
  const [userDetails] = await User.getUserDetailsById(id);

  try {
    res.render("pages/settings.ejs", {
      pageTitle: "TrainingLog: Settings",
      userDetails,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getIndex,
  getContact,
  getFaq,
  getAbout,
  getTerms,
  getPrivacy,
  getSettings,
};
