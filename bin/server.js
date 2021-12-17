#!/usr/bin/env node

const chalk = require("chalk");
const log = console.log;
const error = chalk.black.bgRed;
const success = chalk.black.bgGreen;

const { setUpAdminAccount } = require("../utils/setup-admin.js");
const { testDatabaseConnection, checkForDatabase } = require("../utils/test-database-connection.js");
const { port, database, admin: adminEmail } = require("../config/config.js");

// starting server
(async () => {
  try {
    const isConnection = await testDatabaseConnection();
    const databaseExist = await checkForDatabase(database.database);
    const setupAdmin = await setUpAdminAccount(adminEmail);

    const app = require("../src/app.js");
    app.listen(port);

    log(success(`Server started on http://localhost:${port}`));
    log();
  } catch (err) {
    log(error(err));
    process.exit(1);
  }
})();
