#!/usr/bin/env node

const chalk = require("chalk");
const log = console.log;
const error = chalk.black.bgRed;
const success = chalk.black.bgGreen;
const warn = chalk.black.bgYellow;

const { port, database, admin } = require("../config/config.js");
const db = require("../db/db.js");
const User = require("../src/models/user.model.js");

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

// check to see if admin exit or has be setup
const setUpAdminAccount = async (email) => {
  const adminExist = await User.adminExist(email);
  log(success(`Checking to see if admin account has been setup...`));

  if (!adminExist.length) {
    let message = "You have not set up an admin account yet!\n";
    message += "If you have not sign up, go ahead and make one!\n";
    message += "Then go .env file and replace admin with your email!";
    log(error(message));
  }

  log(success(`Done!`));
  log();

  log(success(`Setting up admin account for ${email}...`));
  const setAdmin = await User.setAdmin(email, true);

  if (!setAdmin) {
    log(
      error(
        `Cannot find an account with ${email},\ncheck to see if .evn and your signed up email are correct!`
      )
    );
  }

  log(success(`Done!`));
  log();
};

// starting server
(async () => {
  try {
    const isConnection = await testDatabaseConnection();
    const databaseExist = await checkForDatabase(database.database);
    const setupAdmin = await setUpAdminAccount(admin);

    const app = require("../src/app.js");
    app.listen(port);

    log(success(`Server started on http://localhost:${port}`));
  } catch (err) {
    log(error(err));
    process.exit(1);
  }
})();
