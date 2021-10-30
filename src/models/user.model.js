const db = require("../../db/db.js");

class User {
  static getUsers = () => {
    return db.select().from("user");
  };

  static getCheckToSeeUserExist = (username, email) => {
    return db
      .select()
      .from("user")
      .where({ username: username })
      .orWhere({ email: email });
  };

  static getCheckToSeeUserExistWithAnEmail = (email) => {
    return db.select().from("user").where({ email: email });
  };

  static getUserDetails = (username) => {
    return db
      .select("id", "profile_picture_url", "username")
      .from("user")
      .where({ "user.username": username });
  };

  static postAddNewUser = (
    name,
    age,
    weight,
    gender,
    username,
    password,
    email
  ) => {
    return db
      .insert({
        name: name,
        age: age,
        weight: weight,
        gender: gender,
        username: username,
        password: password,
        email: email,
      })
      .into("user");
  };
}

module.exports = User;
