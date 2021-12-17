const fs = require("fs");
const path = require("path");
const { root } = require("../utils/directory.js");
const ffmpeg = require("fluent-ffmpeg");

const takeScreenshot = async (videoPath) => {
  const videoUrlForScreenShot = path.join(root, videoPath);
  const screenShotFolderPath = path.join(root, "data", "upload", "thumbnail");

  try {
    // take screenshot at the 0 second then save it at uploads/thumbnails
    ffmpeg(videoUrlForScreenShot).screenshots({
      timestamps: [0],
      folder: screenShotFolderPath,
      filename: videoPath.split("/").pop().concat("_screenshot.jpg"),
      size: "640x640",
    });

    const filename = videoPath.split("/").pop().concat("_screenshot.jpg");
    const screenshotUrl = path.join(
      "/",
      "data",
      "upload",
      "thumbnail",
      filename
    );

    return screenshotUrl;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  takeScreenshot,
};
