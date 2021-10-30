const express = require("express");
const router = express.Router();

const { loginRequired } = require("../middlewares/auth.js");
const { uploadVideo } = require("../middlewares/upload-file.js");

const {
  getSearch,
  getVideo,
  postVideo,
  getVideos,
  getUser,
  postComment,
  deleteVideo,
  deleteComment,
} = require("../controllers/admin.controller.js");

router.get("/search", loginRequired, getSearch);
router.get("/videos", loginRequired, getVideos);

router.get("/users/:username", loginRequired, getUser);

router.get("/videos/:id", getVideo);
router.delete("/videos/:id", loginRequired, deleteVideo);
router.post("/videos", uploadVideo, postVideo);

router.post("/comments/:id", loginRequired, postComment);
router.delete("/comments/:id", loginRequired, deleteComment);

module.exports = router;
