const { env } = require("../config/config.js");

const options = require("./knexfile.js");

const db = require("knex")(options[env]);

module.exports = db;
