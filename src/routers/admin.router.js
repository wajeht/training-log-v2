const express = require("express");
const router = express.Router();

const { loginRequired } = require("../middlewares/auth.js");
const { uploadVideo, uploadPicture } = require("../middlewares/upload-file.js");

const {
  getSearch,
  getVideo,
  getInbox,
  updateVideo,
  postVideo,
  getVideos,
  getVideosJSON,
  getUser,
  getUsersJSON,
  getUsers,
  postComment,
  getSettings,
  getDashboard,
  deleteVideo,
  deleteComment,
  getDownloadVideo,
  postDeleteAccount,
  updateEditProfile,
  updateProfileImage,
  updateChangePassword,
} = require("../controllers/admin.controller.js");

router.get("/users", loginRequired, getUsers);
router.get("/users.json", loginRequired, getUsersJSON);

router.get("/search", loginRequired, getSearch);

router.get("/inbox", loginRequired, getInbox);

router.get("/settings", loginRequired, getSettings);

router.get("/dashboard", loginRequired, getDashboard);

router.get("/users/:username", loginRequired, getUser);

router.get("/videos.json", loginRequired, getVideosJSON);
router.get("/videos", loginRequired, getVideos);
router.post("/videos", loginRequired, uploadVideo, postVideo);

router.put("/videos/:id", loginRequired, uploadVideo, updateVideo);
router.get("/videos/:id", getVideo);
router.delete("/videos/:id", loginRequired, deleteVideo);

router.get("/download/:id", loginRequired, getDownloadVideo);

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
