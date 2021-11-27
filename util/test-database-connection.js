const chalk = require("chalk");
const log = console.log;
const error = chalk.black.bgRed;
const success = chalk.black.bgGreen;

const db = require("../db/db.js");

// check to see if postgres has started
const testDatabaseConnection = () => {
  return new Promise((resolve, reject) => {
    db.raw("select 1")
      .then((res) => {
        log();
        log(success(`Checking to see if PostgreSQL exit...`));
        resolve(res);
      })
      .catch((err) => {
        reject(err);
        log(error("Cannot start to PostgresSQL database!"));
      })
      .finally(() => {
        log(success(`Done!`));
        log();
      });
  });
};

// check to see if database exist
const checkForDatabase = (databaseName) => {
  return new Promise((resolve, reject) => {
    db.raw("select 1 from pg_database where datname = ? ", [1])
      .then((res) => {
        log(success(`Checking to see if ${databaseName} database exist...`));
        resolve(res);
      })
      .catch((err) => {
        reject(err);
        log(error(`Cannot find ${databaseName} database!`));
      })
      .finally(() => {
        log(success(`Done!`));
        log();
      });
  });
};

module.exports = {
  testDatabaseConnection,
  checkForDatabase,
};
