const express = require("express");
const router = express.Router();

const { loginRequired } = require("../middlewares/auth.js");

const {
  getIndex,
  getContact,
  getFaq,
  getTerms,
  getAbout,
  getPrivacy,
  getSettings,
} = require("../controllers/index.controller.js");

router.get("/", getIndex);
router.get("/faq", getFaq);
router.get("/terms", getTerms);
router.get("/about", getAbout);
router.get("/contact", getContact);
router.get("/privacy", getPrivacy);
router.get("/settings", loginRequired, getSettings);

module.exports = router;
