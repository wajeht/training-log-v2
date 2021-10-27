const Video = require("../models/video.model.js");
const User = require("../models/user.model.js");
const Comment = require("../models/comment.model.js");

const postVideo = async (req, res, next) => {
  const { date, title, description, videoUrl, screenshotUrl, userId } =
    req.body;

  const inserted = await Video.postAVideo(
    date,
    title,
    description,
    videoUrl,
    screenshotUrl,
    userId
  );

  const [id] = inserted;

  if (inserted === undefined) {
    throw new Error("something went wrong");
  }

  res.redirect(`/videos/${id}`);
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

const deleteVideo = async (req, res, next) => {
  console.log(req.body);
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
