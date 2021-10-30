const fs = require("fs");
const path = require("path");

const { root } = require("../util/directory.js");
const Video = require("../src/models/video.model.js");

const deleteFiles = (files, callback) => {
  let i = files.length;
  files.forEach((filepath) => {
    fs.unlink(filepath, (err) => {
      i--;
      if (err) {
        callback(err);
        return;
      } else if (i <= 0) {
        callback(null);
      }
    });
  });
};

const deleteLocalVideo = async (videoId) => {
  const [videoDetails] = await Video.getVideoDetails(videoId);
  const { video_url, screenshot_url } = videoDetails;
  const files = [path.join(root, video_url), path.join(root, screenshot_url)];
  return new Promise((resolve, reject) => {
    deleteFiles(files, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve(true);
      }
    });
  });
};

module.exports = {
  deleteLocalVideo,
};