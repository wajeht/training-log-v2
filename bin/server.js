#!/usr/bin/env node

const chalk = require("chalk");
const log = console.log;
const error = chalk.black.bgRed;
const success = chalk.black.bgGreen;

const { port } = require("../config/config.js");
const db = require("../db/db.js");

const testDatabaseConnection = () => {
  return new Promise((resolve, reject) => {
    db.raw("select 1")
      .then((res) => {
        log(success(`Database connected successfully!`));
        resolve(res);
      })
      .catch((err) => {
        reject(err);
        log(error("Cannot connect to database!"));
      });
  });
};

(async () => {
  try {
    const conn = await testDatabaseConnection();

    const app = require("../src/app.js");
    app.listen(port);

    log(success(`Server started on http://localhost:${port}`));
  } catch (err) {
    log(error(err));
    process.exit(1);
  }
})();
