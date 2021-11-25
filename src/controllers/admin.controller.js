const Video = require("../models/video.model.js");
const User = require("../models/user.model.js");
const Comment = require("../models/comment.model.js");

const fs = require("fs");
const path = require("path");

const { root } = require("../../util/directory.js");
const { takeScreenshot } = require("../../util/take-screenshot.js");
const { minifyImage } = require("../../util/minify-image.js");
const { deleteLocalVideo } = require("../../util/delete-video.js");
const { deleteAllUserVideos } = require("../../util/delete-video.js");
const config = require("../../config/config.js");

const bcrypt = require("bcryptjs");

/**
 * Post a vide video from add video modal
 * @route POST /video
 */
const postVideo = async (req, res, next) => {
  try {
    const { title, description, userId } = req.body;
    const video = `/${req.file.path}`;

    const date = new Date().toLocaleDateString();

    const screenshotUrl = await takeScreenshot(video);

    const minifyScreenshotUrl = await minifyImage(screenshotUrl);

    let inserted = await Video.postAVideo(
      date,
      title,
      description,
      video,
      screenshotUrl,
      userId
    );

    const [id] = inserted;

    // this 1 sec will let the screenshot to generate
    // and minify the image before redirecting
    setTimeout(() => {
      res.redirect(`/videos/${id}`);
    }, 1000);
  } catch (err) {
    next(err);
  }
};

/**
 * Get a video detail
 * @route GET /video/:id
 */
const getVideo = async (req, res, next) => {
  try {
    const { id } = req.params;
    const [videoDetails] = await Video.getVideoDetails(id);

    if (!videoDetails) {
      throw new Error("Cannot find the video");
    }

    let recentVideos = await Video.getRecentVideos();
    recentVideos = recentVideos.splice(1)
    const comments = await Comment.getCommentsFromAVideo(id);

    res.render("pages/video.ejs", {
      pageTitle: `TrainingLog: ${videoDetails.title}`,
      videoDetails,
      comments,
      recentVideos,
      // downloadLink: res.attachment(path.join(root, videoDetails.video_url)),
    });
  } catch (err) {
    next(err);
  }
};

/**
 * Download a video via a get request
 * @route GET /download/:id
 */
const getDownloadVideo = async (req, res, next) => {
  try {
    const { id } = req.params;
    const [videoDetails] = await Video.getVideoDetails(id);

    if (!videoDetails) {
      throw new Error("Cannot find the video");
    }

    return res.download(path.join(root, videoDetails.video_url));
  } catch (err) {
    next(err);
  }
};

/**
 * Delete a single video
 * @route DELETE /video/:id
 */
const deleteVideo = async (req, res) => {
  try {
    const { videoId, userId } = req.body;

    if (userId != req.session.user.id) {
      throw new Error("not authorized!");
    }

    const doneDeletingLocalFiles = await deleteLocalVideo(videoId);

    const deleted = await Video.deleteVideoWithVideoIdAndUserId(
      videoId,
      userId
    );

    if (!deleted || !doneDeletingLocalFiles) {
      throw new Error("Something went wrong with your request!");
    }

    return res.status(200).json({ message: "success!" });
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

/**
 * Get list of videos
 * @route GET /videos
 */
const getVideos = async (req, res, next) => {
  try {
    const videosPerPage = 16;
    const page = req.query.page || 1;

    let [count] = await Video.countAllVideos();
    count = Number.parseInt(count.count);

    const videos = await Video.getAllVideosWithUserDetails(videosPerPage, page);

    res.render("pages/videos.ejs", {
      pageTitle: "TrainingLog: Videos",
      videos,
      current: page,
      pages: Math.ceil(count / videosPerPage),
    });
  } catch (err) {
    next(err);
  }
};

/**
 * Get user details page
 * @route GET /users/:username
 */
const getUser = async (req, res, next) => {
  try {
    const { username } = req.params;
    const [userInfo] = await User.getUserDetails(username);
    const userVideos = await Video.getAllVideosThatMatchesUsername(username);

    const userDetails = {
      userInfo,
      userVideos,
    };

    res.render("pages/profile.ejs", {
      pageTitle: `TrainingLog: ${userDetails.userInfo.username}'s profile`,
      userDetails,
    });
  } catch (err) {
    next(err);
  }
};

/**
 * List of users page
 * @route GET /users
 */
const getUsers = async (req, res, next) => {
  try {
    const users = await User.getUsers();
    res.render("pages/users.ejs", {
      pageTitle: "TrainingLog: Users",
      users,
    });
  } catch (err) {
    next(err);
  }
};

/**
 * Get search page
 * @route GET /search
 */
const getSearch = async (req, res, next) => {
  try {
    const { q } = req.query;
    const searchResults = await Video.getAllVideosThatMatchesSearchParams(q);

    res.render("pages/search.ejs", {
      pageTitle: "Search",
      searchResults,
    });
  } catch (err) {
    next(err);
  }
};

/**
 * Post a comment under a video detail page
 * @route POST /comments/:id
 */
const postComment = async (req, res, next) => {
  const videoId = req.params.id; // id == "video.id"
  const userId = req.session.user.id;
  const { comment } = req.body;

  try {
    const addingComment = await Comment.postAddACommentToAVideo(
      new Date().toISOString(),
      comment,
      videoId,
      userId
    );
    res.status(201).json({ message: "success!", comment: addingComment });
    // if (addingComment) {
    //   res.redirect(`/videos/${videoId}`);
    // }
  } catch (err) {
    next(err);
  }
};

/**
 * Delete a comment under a video detail page
 * @route Delete /comments/:id
 */
const deleteComment = async (req, res, next) => {
  try {
    const { video_user_id, comment_id, session_user_id } = req.body;

    if (video_user_id != session_user_id) {
      throw new Error("You are not authorized!");
    }

    const deleted = await Comment.deleteComment(comment_id);

    if (!deleted) {
      throw new Error("Something went wrong while deleting!");
    }

    res.status(200).json({ message: "ok" });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

/**
 * Update user info
 * @route PUT /settings/edit-profile
 */
const updateEditProfile = async (req, res, next) => {
  const { id, name, username, email, age, weight, gender, biography } =
    req.body;

  try {
    if (biography.length > 255) {
      throw new Error("must be less than 255 words");
    }

    if (username == "" || email == "") {
      throw new Error("username or email must not be empty ");
    }

    const updated = await User.postUpdateProfile(
      id,
      name,
      username,
      email,
      age,
      weight,
      gender,
      biography
    );

    if (!updated) {
      throw new Error("Something went wrong while updating!");
    }

    res.status(200).json({ message: "ok" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * Update user password
 * @route PUT /settings/change-password
 */
const updateChangePassword = async (req, res, next) => {
  const { oldPassword, newPassword, confirmNewPassword, userId } = req.body;

  try {
    const { id } = req.session.user;

    if (Number.parseInt(userId) != id) {
      throw new Error("You are not authorized!");
    }

    const [user] = await User.getUserDetailsById(id);

    const samePassword = await bcrypt.compare(oldPassword, user.password);

    if (!samePassword) {
      throw new Error("wrong old password!");
    }

    if (newPassword != confirmNewPassword) {
      throw new Error("re-enter your new password!");
    }

    const newHashedPassword = await bcrypt.hash(confirmNewPassword, 14);

    const updated = await User.updateChangePassword(id, newHashedPassword);

    if (!updated) {
      throw new Error("something went wrong updating your password");
    }

    res.status(200).json({ message: "ok" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * Delete user account
 * @route DELETE /settings/delete-account
 */
const postDeleteAccount = async (req, res, next) => {
  try {
    const { id, password } = req.body;
    const [user] = await User.getUserDetailsById(Number.parseInt(id));

    if (Number.parseInt(id) != req.session.user.id) {
      throw new Error("you are not authorized!");
    }

    const samePassword = await bcrypt.compare(password, user.password);

    if (!samePassword) {
      throw new Error("wrong password!");
    }

    const doneDeletingLocalFiles = await deleteAllUserVideos(user.id);
    const doneDeletingVideoDatabase = await Video.deleteAllUserVideosWithUserId(
      user.id
    );

    if (!doneDeletingVideoDatabase || !doneDeletingLocalFiles) {
      throw new Error("something went wrong while deleting your videos!");
    }

    const doneDeletingUser = await User.deleteUser(user.id);

    if (!doneDeletingUser) {
      throw new Error("something went wrong while deleting your account!");
    }

    req.flash("success", "you account has been deleted!");

    req.session.isLoggedIn = false;
    req.session.user = undefined;
    res.redirect("/signin");
    req.session.destroy();
  } catch (err) {
    next(err);
  }
};

/**
 * Update user profile image
 * @route PUT /settings/update-profile-image
 */
const updateProfileImage = async (req, res, next) => {
  try {
    const picture = `/${req.file.path}`;
    let { userId } = req.body;
    userId = Number.parseInt(userId);

    if (userId != req.session.user.id) {
      throw new Error("You're not authorized!");
    }

    const [userDetails] = await User.getUserDetailsById(userId);
    const old_profile_picture_url = userDetails.profile_picture_url;

    // don't delete  picture
    if (old_profile_picture_url.split("/")[2] != "rick.jpg") {
      fs.unlink(path.join(root, old_profile_picture_url), (err) => {
        if (err) throw err;
      });
    }

    const updated = await User.updateProfileImage(picture, userId);

    if (!updated) {
      throw new Error("something went wrong while updating!");
    }

    res.status(200).json({ message: "ok" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

/**
 * Setting page.
 * @route GET /setting
 */
const getSettings = async (req, res, next) => {
  const { id } = req.session.user;
  const [userDetails] = await User.getUserDetailsById(id);

  try {
    res.render("pages/settings.ejs", {
      pageTitle: "TrainingLog: Settings",
      userDetails,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  postVideo,
  getVideo,
  deleteVideo,
  getVideos,
  getUser,
  getUsers,
  getSearch,
  getSettings,
  postComment,
  deleteComment,
  getDownloadVideo,
  postDeleteAccount,
  updateEditProfile,
  updateProfileImage,
  updateChangePassword,
};
