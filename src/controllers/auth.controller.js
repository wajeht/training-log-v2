const User = require("../models/user.model.js");
const bcrypt = require("bcryptjs");
const db = require("../../db/db.js");
const PasswordService = require("../services/password.service.js");

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
 * Signin page.
 * @route GET /signin
 */
const getSignin = (req, res, next) => {
  try {
    res.render("pages/auth/signin.ejs", {
      pageTitle: "TrainingLog: Signin",
    });
  } catch (err) {
    next(err);
  }
};

/**
 * Signup page.
 * @route GET /signup
 */
const getSignup = (req, res, next) => {
  try {
    res.render("pages/auth/signup.ejs", {
      pageTitle: "TrainingLog: Signup",
    });
  } catch (err) {
    next(err);
  }
};

/**
 * Forget password page.
 * @route GET /forget-password
 */
const getForgetPassword = (req, res, next) => {
  try {
    res.render("pages/auth/forget-password.ejs", {
      pageTitle: "TrainingLog: Forget password",
    });
  } catch (err) {
    next(err);
  }
};

/**
 * Send a post request from forget password page.
 * @route POST /forget-password
 */
const postForgetPassword = async (req, res, next) => {
  const { email } = req.body;

  try {
    const userExist = await User.getCheckToSeeUserExistWithAnEmail(email);
    const { id, name } = userExist[0];

    if (!userExist.length) {
      req.flash("error", "check your email again!");
      return res.redirect("/forget-password");
    }

    const newGeneratedPassword = new PasswordService().getPassword();
    const hashedPassword = await bcrypt.hash(newGeneratedPassword, 14);
    const updatePassword = await User.updateChangePassword(id, hashedPassword);

    if (!updatePassword) {
      throw new Error("something went wrong updating your password");
    }

    transporter.sendMail({
      to: `${email}`,
      from: `${name} <${config.sendGrid.fromEmail}>`,
      subject: `Password reset from traininglog.tv's`,
      html: `
		<p>Hello ${name},</p>
    <br>
		<p>You've request to reset for a new password. Please login to update using your temporary password!</p>
		<p>Temporary password: ${newGeneratedPassword}</p>
    <br>
		<p>Thanks,</p>
		<p>Jaw</p>
		`,
    });

    req.flash("success", "Check your email for new password!");
    return res.redirect("/signin");
  } catch (err) {
    next(err);
  }
};

/**
 * Send a post req from login page
 * @route post /login
 */
const postLogin = async (req, res, next) => {
  try {
    const { email, password, remember } = req.body;
    const [doesUserExist] = await User.getCheckToSeeUserExistWithAnEmail(email);

    // if user does not exist
    if (doesUserExist == undefined) {
      req.flash("error", "user does not exist!");
      return res.redirect("/signin");
    }

    // check for correct password
    const userDoesExist = await bcrypt.compare(
      password,
      doesUserExist.password
    );

    if (userDoesExist) {
      req.session.isLoggedIn = true;
      req.session.user = doesUserExist;
      req.session.save();

      // TODO: refactor in to separate function
      // grab sessionID so we can increase cookie expiration to higher date
      const sessionID = req.session.id;

      // tomorrow date
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);

      if (typeof remember == "" && remember == "on") {
        db.update({ expired: tomorrow })
          .from("sessions")
          .where({ sid: sessionID });
      }

      return res.redirect(`/users/${req.session.user.username}`);
    }

    req.flash("error", "wrong email or password!");
    return res.redirect("/signin");
  } catch (err) {
    next(err);
  }
};

/**
 * Send a post req from logout page
 * @route post /logout
 */
const postLogout = (req, res, next) => {
  try {
    req.session.isLoggedIn = false;
    req.session.user = undefined;
    req.session.destroy(() => {
      res.redirect("/");
    });
  } catch (err) {
    next(err);
  }
};

/**
 * Send a post req from signup form page
 * @route post /signup
 */
const postSignup = async (req, res, next) => {
  try {
    const { name, age, weight, gender, username, email, password } = req.body;
    const [doesUserExist] = await User.getCheckToSeeUserExist(username, email);

    // if user does not exist
    // hash the password and signup
    if (doesUserExist == undefined) {
      const hashedPassword = await bcrypt.hash(password, 14);
      const user = await User.postAddNewUser(
        name,
        age,
        weight,
        gender,
        username,
        hashedPassword,
        email
      );

      req.flash("success", "you have successfully signed up!");
      return res.redirect("/signin");
    }

    res.redirect("/signup");
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getSignin,
  getSignup,
  postForgetPassword,
  getForgetPassword,
  postLogin,
  postLogout,
  postSignup,
};
