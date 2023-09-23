#!/usr/bin/env node

const chalk = require("chalk");
const log = console.log;
const error = chalk.black.bgRed;
const success = chalk.black.bgGreen;

const { setUpAdminAccount } = require("../utils/setup-admin.js");
const { testDatabaseConnection, checkForDatabase } = require("../utils/test-database-connection.js");
const { port, database, admin: adminEmail } = require("../config/config.js");
const messageHandler = require("../src/sockets/message.handler.js");

// starting server
(async () => {
  try {
    const isConnection = await testDatabaseConnection();
    // const databaseExist = await checkForDatabase(database.database);
    const setupAdmin = await setUpAdminAccount(adminEmail);

    const app = require("../src/app.js");

    // -------------------- socket io starts --------------------
    const http = require("http");
    const server = http.createServer(app);
    const { Server } = require("socket.io");
    const io = require("socket.io")(server);

    const init = (socket) => {
      console.log("Initialized socket.io!");
      messageHandler(io, socket);
    };

    io.on("connection", init);
    // -------------------- socket io ends --------------------

    server.listen(port);

    log(success(`Server started on http://localhost:${port}`));
    log();
  } catch (err) {
    log(error(err));
    process.exit(1);
  }
})();
