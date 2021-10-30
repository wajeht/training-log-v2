const db = require("../../db/db.js");

class Comment {
  static getCommentsFromAVideo = (video_id) => {
    return db
      .select(
        "user.id",
        "user.username",
        "user.profile_picture_url",
        "comment.id",
        "comment.user_id",
        "comment.comment",
        "comment.date"
      )
      .from("comment")
      .leftJoin("user", "user.id", "comment.user_id")
      .leftJoin("video", "video.id", "comment.video_id")
      .where({ "video.id": video_id });
  };

  static postAddACommentToAVideo = (date, comment, videoId, userId) => {
    return db
      .insert({
        date: date,
        comment: comment,
        video_id: videoId,
        user_id: userId,
      })
      .into("comment")
      .returning(["comment", "date", "video_id", "user_id"]);
  };

  static deleteComment= (comment_id) => {
    return db.del().from("comment").where({ id: comment_id });
  };
}

module.exports = Comment;
