const db = require("../../db/db.js");

class Video {
  static getAllVideos = () => {
    return db.select().from("video");
  };

  static deleteVideoWithVideoIdAndUserId = (videoId, userId) => {
    return db.del().from("video").where({
      id: videoId,
      user_id: userId,
    });
  };

  static getAllVideosWithUserDetails = () => {
    return db
      .select(
        "video.user_id",
        "user.username",
        "user.profile_picture_url",
        "video.screenshot_url",
        "video.id",
        "video.title"
      )
      .from("video")
      .join("user", "user.id", "video.user_id")
      .orderBy("video.id", "desc");
  };

  static getAllVideosThatMatchesUsername = (username) => {
    return db
      .select(
        "video.user_id",
        "user.username",
        "user.profile_picture_url",
        "video.screenshot_url",
        "video.id",
        "video.title"
      )
      .from("video")
      .join("user", "user.id", "video.user_id")
      .where({ "user.username": username });
  };

  static getVideoDetails = (video_id) => {
    return db
      .select(
        "video.id",
        "screenshot_url",
        "profile_picture_url",
        "title",
        "description",
        "username",
        "date"
      )
      .from("video")
      .innerJoin("user", "user.id", "video.user_id")
      .where({ "video.id": video_id });
  };

  static getRecentVideos = () => {
    return db
      .select(
        "video.user_id",
        "user.id",
        "screenshot_url",
        "profile_picture_url",
        "description",
        "username",
        "video.id",
        "video.title"
      )
      .from("video")
      .innerJoin("user", "user.id", "video.user_id")
      .orderBy("video.id", "desc")
      .limit(3);
  };

  static getAllVideosThatMatchesSearchParams = (query) => {
    return db
      .select(
        "user.username",
        "user.profile_picture_url",
        "video.screenshot_url",
        "video.id",
        "video.title"
      )
      .from("video")
      .innerJoin("user", "user.id", "video.user_id")
      .whereRaw(`lower(description) like ?`, [`%${query}%`]);
  };

  static postAVideo = (
    date,
    title,
    description,
    video_url,
    screenshot_url,
    user_id
  ) => {
    return db
      .insert({
        date,
        title,
        description,
        video_url,
        screenshot_url,
        user_id,
      })
      .into("video")
      .returning("video.id");
  };
}

module.exports = Video;
