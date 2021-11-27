#!/usr/bin/env node

const chalk = require("chalk");
const log = console.log;
const error = chalk.black.bgRed;
const success = chalk.black.bgGreen;

const { port, database, admin } = require("../config/config.js");
const db = require("../db/db.js");

// check to see if postgres has started
const testDatabaseConnection = () => {
  return new Promise((resolve, reject) => {
    db.raw("select 1")
      .then((res) => {
        log(success(`Checking to see if PostgreSQL exit...`));
        resolve(res);
      })
      .catch((err) => {
        reject(err);
        log(error("Cannot start to PostgresSQL database!"));
      });
  });
};

// check to see if database exist
const checkForDatabase = (databaseName) => {
  return new Promise((resolve, reject) => {
    db.raw("select 1 from pg_database where datname = ? ", [1])
      .then((res) => {
        log(success(`Check to see if ${databaseName} database exist...`));
        resolve(res);
      })
      .catch((err) => {
        reject(err);
        log(error(`Cannot find ${databaseName} database!`));
      });
  });
};

// starting server
(async () => {
  try {
    const isConnection = await testDatabaseConnection();
    const databaseExist = await checkForDatabase(database.database);

    const app = require("../src/app.js");
    app.listen(port);

    log(success(`Server started on http://localhost:${port}`));
  } catch (err) {
    log(error(err));
    process.exit(1);
  }
})();

