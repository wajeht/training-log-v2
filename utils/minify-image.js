const path = require("path");

const minifyImage = async (videoUrl) => {
  const fn = videoUrl.split("/").pop().concat("_screenshot.jpg");
  const screenshotUrl = path.join("/", "data", "upload", "thumbnail", fn);
  const screenShotFolderPath = path.join("/", "data", "upload", "thumbnail");

  // optimize the image
  (async () => {
    const imagemin = (await import("imagemin")).default;
    const imageminMozjpeg = (await import("imagemin-mozjpeg")).default;

    await imagemin([screenshotUrl], screenShotFolderPath, {
      use: [imageminMozjpeg()],
    });
  })();
};

module.exports = {
  minifyImage,
};
