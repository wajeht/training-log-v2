const express = require("express");
const router = express.Router();

const {
  postLogin,
  postLogout,
  postSignup,
  getSignin,
  getSignup,
  getForgetPassword,
  postForgetPassword,
} = require("../controllers/auth.controller.js");

const { isLoggedIn } = require("../middlewares/auth.js");

router.get("/signin", isLoggedIn, getSignin);
router.get("/signup", isLoggedIn, getSignup);
router.get("/forget-password", isLoggedIn, getForgetPassword);
router.post("/forget-password", isLoggedIn, postForgetPassword);

router.post("/login", isLoggedIn, postLogin);
router.post("/logout", postLogout);
router.post("/signup", isLoggedIn, postSignup);

module.exports = router;
