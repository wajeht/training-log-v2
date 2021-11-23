const express = require("express");
const router = express.Router();

const { loginRequired } = require("../middlewares/auth.js");
const { uploadVideo, uploadPicture } = require("../middlewares/upload-file.js");

const {
  getSearch,
  getVideo,
  postVideo,
  getVideos,
  getUser,
  postContact,
  postComment,
  getSettings,
  deleteVideo,
  deleteComment,
  postDeleteAccount,
  updateEditProfile,
  updateProfileImage,
  updateChangePassword,
} = require("../controllers/admin.controller.js");

router.post("/contact", postContact);

router.get("/search", loginRequired, getSearch);

router.get("/settings", loginRequired, getSettings);

router.get("/users/:username", loginRequired, getUser);

router.get("/videos", loginRequired, getVideos);
router.post("/videos", uploadVideo, postVideo);

router.get("/videos/:id", getVideo);
router.delete("/videos/:id", loginRequired, deleteVideo);

router.post("/comments/:id", loginRequired, postComment);
router.delete("/comments/:id", loginRequired, deleteComment);

router.put("/settings/edit-profile", loginRequired, updateEditProfile);
router.put("/settings/change-password", loginRequired, updateChangePassword);
router.put(
  "/settings/update-profile-image",
  loginRequired,
  uploadPicture,
  updateProfileImage
);

router.post("/settings/delete-account", loginRequired, postDeleteAccount);

module.exports = router;
