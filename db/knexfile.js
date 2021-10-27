const { database } = require("../config/config.js");

module.exports = {
  development: {
    client: "pg",
    connection: {
      database: database.database,
      user: database.username,
      password: database.password,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
    },
  },
  production: {
    client: "pg",
    connection: {
      database: database.database,
      user: database.username,
      password: database.password,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
    },
  },
};
