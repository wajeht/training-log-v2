const express = require("express");
const router = express.Router();

const {
  getIndex,
  getContact,
  postContact,
  getFaq,
  getTerms,
  getAbout,
  getPrivacy,
  getHealthCheck,
} = require("../controllers/base.controller.js");

router.get("/", getIndex);
router.get("/faq", getFaq);
router.get("/terms", getTerms);
router.get("/about", getAbout);
router.get("/contact", getContact);
router.post("/contact", postContact);
router.get("/privacy", getPrivacy);
router.get("/health-check", getHealthCheck);

module.exports = router;
