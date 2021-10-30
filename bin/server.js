#!/usr/bin/env node

const chalk = require("chalk");
const db = require("../db/db.js");
const app = require("../src/app.js");
const PORT = 3000;

const log = console.log;
const error = chalk.black.bgRed;
const success = chalk.black.bgGreen;

(async () => {
  try {
    const conn = await db.raw("select 1");

    if (!conn) {
      throw new Error("Db cannot connect!");
    }

    app.listen(PORT, () => {
      log(success(`Db connected successfully!`));
      log(success(`Server started on http://localhost:${PORT}`));
    });


  } catch (err) {
    log(error(err));
  }
})();
