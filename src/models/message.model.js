const db = require("../../db/db.js");

class Message {
  static send = (message, sender_id, receiver_id) => {
    return db
      .insert({ message })
      .into("message")
      .returning("id")
      .then((res) => {
        const message_id = res[0];
        return db
          .insert({
            sender_id,
            receiver_id,
            message_id,
          })
          .into("users_message");
      });
  };

  static get = (receiver_id, sender_id) => {
    return db
      .select("*")
      .from("message")
      .leftJoin("users_message", "users_message.message_id", "id")
      .where({
        receiver_id,
      })
      .andWhere({ sender_id });
  };

  // static get = (sender_id, receiver_id) => {
  //   return db
  //     .select("*")
  //     .from("users_message")
  //     .innerJoin("message", "message.id", "users_message.message_id")
  //     .where({
  //       sender_id,
  //       receiver_id,
  //     });
  // };
}

module.exports = Message;
