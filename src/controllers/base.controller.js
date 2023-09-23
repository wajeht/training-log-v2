const Video = require("../models/video.model.js");

const nodemailer = require("nodemailer");
const config = require("../../config/config.js");

const smtpConfig = {
  host: config.email.host,
  port: config.email.port,
  secure: config.email.secure,
  auth: {
    user: config.email.auth_user,
    pass: config.email.auth_pass,
  },
};
const transporter = nodemailer.createTransport(smtpConfig);

/**
 * Home page.
 * @route GET /
 */
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

/**
 * Contact form page.
 * @route GET /contact
 */
const getContact = (req, res, next) => {
  try {
    res.render("pages/contact.ejs", {
      pageTitle: "TrainingLog: Contact",
    });
  } catch (err) {
    next(err);
  }
};

/**
 * Send a contact form via Nodemailer
 * @route POST /contact
 */
const postContact = (req, res, next) => {
  const { name, email, message } = req.body;

  try {
    transporter.sendMail({
      to: `${config.sendGrid.fromEmail}`,
      from: `${name} <${config.sendGrid.fromEmail}>`,
      subject: `traininglog.tv's contact page`,
      html: `
		<p>${name}</p>
		<p>${email}</p>
		<p>${message}</p>
		`,
    });

    res.status(200).json({ message: "ok" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * FAQ page.
 * @route GET /faq
 */
const getFaq = (req, res, next) => {
  try {
    res.render("pages/faq.ejs", {
      pageTitle: "TrainingLog: Faq",
    });
  } catch (err) {
    next(err);
  }
};

/**
 * Terms and Services page.
 * @route GET /terms
 */
const getTerms = (req, res, next) => {
  try {
    res.render("pages/terms.ejs", {
      pageTitle: "TrainingLog: Terms",
    });
  } catch (err) {
    next(err);
  }
};

/**
 * Privacy page.
 * @route GET /privacy
 */
const getPrivacy = (req, res, next) => {
  try {
    res.render("pages/privacy.ejs", {
      pageTitle: "TrainingLog: Privacy",
    });
  } catch (err) {
    next(err);
  }
};

/**
 * About page.
 * @route GET /about
 */
const getAbout = (req, res, next) => {
  try {
    res.render("pages/about.ejs", {
      pageTitle: "TrainingLog: About",
    });
  } catch (err) {
    next(err);
  }
};

/**
 * About page.
 * @route GET /about
 */
const getHealthCheck = (req, res, next) => {
  try {
    res.json({
      message: "ok",
      date: new Date(),
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getIndex,
  getContact,
  postContact,
  getFaq,
  getAbout,
  getTerms,
  getPrivacy,
  getHealthCheck,
};
