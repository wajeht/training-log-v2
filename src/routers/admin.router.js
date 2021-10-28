const express = require("express");
const router = express.Router();

const { loginRequired } = require("../middlewares/auth.js");

const {
  getSearch,
  getVideo,
  postVideo,
  getVideos,
  getUser,
  postComment,
  deleteVideo,
} = require("../controllers/admin.controller.js");

router.get("/search/", loginRequired, getSearch);
router.get("/videos", loginRequired, getVideos);
router.get("/videos/:id", getVideo);
router.get("/users/:username", loginRequired, getUser);

router.delete("/videos/:id", deleteVideo);

router.post("/videos", postVideo);
router.post("/comments/:id", loginRequired, postComment);

module.exports = router;
