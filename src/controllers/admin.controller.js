const Video = require("../models/video.model.js");
const User = require("../models/user.model.js");
const Comment = require("../models/comment.model.js");

const { takeScreenshot } = require("../../util/take-screenshot.js");
const { minifyImage } = require("../../util/minify-image.js");

const postVideo = async (req, res, next) => {
  try {
    const { date, title, description, userId } = req.body;
    const video = `/${req.file.path}`;

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

    console.log(videoDetails);

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

    console.log(req.session.user.id);

    if (userId != req.session.user.id) {
      throw new Error("not authorized!");
    }

    const deleted = await Video.deleteVideoWithVideoIdAndUserId(
      videoId,
      userId
    );

    if (!deleted) {
      throw new Error("Something went wrong with your request!");
    }

    return res.status(200).json({ message: "success!" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err });
  }
};

const getVideos = async (req, res, next) => {
  try {
    const videos = await Video.getAllVideosWithUserDetails();

    res.render("pages/videos.ejs", {
      pageTitle: "TrainingLog: Videos",
      videos,
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

module.exports = {
  postVideo,
  getVideo,
  deleteVideo,
  getVideos,
  getUser,
  getSearch,
  postComment,
};
