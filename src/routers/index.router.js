const express = require("express");
const router = express.Router();

const {
  getIndex,
  getContact,
  getFaq,
  getTerms,
  getAbout,
  getPrivacy,
} = require("../controllers/index.controller.js");

router.get("/", getIndex);
router.get("/faq", getFaq);
router.get("/terms", getTerms);
router.get("/about", getAbout);
router.get("/contact", getContact);
router.get("/privacy", getPrivacy);

module.exports = router;
