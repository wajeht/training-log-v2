exports.up = (knex) => {
  return knex.schema.createTable("sessions", (table) => {
    table.string("sid").notNullable();
    table.json("sess").notNullable();
    table.timestamp("expired").notNullable();
  });
};

exports.down = (knex) => {
  return knex.schema.dropTableIfExists("sessions");
};
