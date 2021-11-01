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
      .select(
        "id",
        "profile_picture_url",
        "name",
        "username",
        "biography",
        "age",
        "weight",
        "gender",
        "email"
      )
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

  static postUpdateProfile = (
    id,
    name,
    username,
    email,
    age,
    weight,
    gender,
    biography
  ) => {
    return db
      .update({
        name: name,
        username: username,
        email: email,
        age: age,
        weight: weight,
        gender: gender,
        biography,
      })
      .from("user")
      .where({ id: id });
  };
}

module.exports = User;
