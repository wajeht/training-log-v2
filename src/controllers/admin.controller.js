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
const nodemailer = require("nodemailer");

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

const getVideo = async (req, res, next) => {
  try {
    const { id } = req.params;
    const [videoDetails] = await Video.getVideoDetails(id);

    if (!videoDetails) {
      throw new Error("Cannot find the video");
    }

    const recentVideos = await Video.getRecentVideos();
    const comments = await Comment.getCommentsFromAVideo(id);

    res.render("pages/video.ejs", {
      pageTitle: `TrainingLog: ${videoDetails.title}`,
      videoDetails,
      comments,
      recentVideos,
    });
  } catch (err) {
    next(err);
  }
};

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

const postContact = (req, res, next) => {
  const { name, email, message } = req.body;

  try {
    transporter.sendMail({
      to: `${config.sendGrid.fromEmail}`,
      from: `${name} <${config.sendGrid.fromEmail}>`,
      subject: `traininglog.tv's contact page`,
      html: `
		<p>${name}</p>
		<p>${email}</p>
		<p>${message}</p>
		`,
    });

    res.status(200).json({ message: "ok" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  postVideo,
  getVideo,
  deleteVideo,
  getVideos,
  getUser,
  getSearch,
  postContact,
  postComment,
  deleteComment,
  postDeleteAccount,
  updateEditProfile,
  updateProfileImage,
  updateChangePassword,
};
