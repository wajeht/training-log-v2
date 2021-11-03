const uuid = require("uuid").v4;
const multer = require("multer");

const path = require("path");

const fileFilter = (req, file, cb) => {
  const fileTypes = /jpeg|jpg|png|gif|mp4|mov|mpeg/;
  const mimetype = fileTypes.test(file.mimetype);
  const extname = fileTypes.test(path.extname(file.originalname));

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(null, false);
  }
};

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "data/upload");
  },
  filename: (req, file, cb) => {
    cb(null, uuid() + file.originalname);
  },
});

const upload = multer({
  fileFilter: fileFilter,
  storage: fileStorage,
  limits: {
    // 10 MB
    fileSize: 10 * 1024 * 1024,
  },
});

const uploadVideo = upload.single("video");
const uploadPicture = upload.single("profilePicture");

module.exports = {
  uploadVideo,
  uploadPicture,
};
