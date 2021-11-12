const chalk = require("chalk");
const log = console.log;
const error = chalk.black.bgRed;
const success = chalk.black.bgGreen;

const { env } = require("../config/config.js");

const options = require("./knexfile.js");

const db = require("knex")(options[env]);

module.exports = db;
