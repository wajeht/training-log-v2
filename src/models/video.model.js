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

  static deleteAllUserVideosWithUserId = (userId) => {
    return db.del().from("video").where({ "video.user_id": userId });
  };

  static getAllVideosWithUserDetails = (videosPerPage, page) => {
    return db
      .select(
        "video.user_id",
        "user.username",
        "user.profile_picture_url",
        "video.screenshot_url",
        "video.id",
        "video.title",
        "video.description",
        "video.date",
        "user.is_admin",
        "user.is_client"
      )
      .from("video")
      .limit(videosPerPage)
      .offset((page - 1) * videosPerPage)
      .join("user", "user.id", "video.user_id")
      .orderBy("video.id", "desc");
  };

  static countAllVideos = () => {
    return db.count().from("video");
  };

  static putUpdateVideo = (
    video_id,
    date,
    title,
    description,
    video_url,
    screenshot_url
  ) => {
    return db
      .update({
        date: date,
        title: title,
        description: description,
        video_url: video_url,
        screenshot_url: screenshot_url,
      })
      .from("video")
      .where({ "video.id": video_id })
      .returning("*");
  };

  static getAllVideosThatMatchesUsername = (username) => {
    return db
      .select(
        "video.user_id",
        "user.username",
        "user.profile_picture_url",
        "video.video_url",
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
        "video.video_url",
        "screenshot_url",
        "profile_picture_url",
        "title",
        "description",
        "username",
        "video.user_id",
        "date",
        "user.is_admin",
        "user.is_client"
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
      .limit(4);
  };

  static getAllVideosThatMatchesSearchParams = (query) => {
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
