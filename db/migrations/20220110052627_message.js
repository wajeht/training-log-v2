exports.up = (knex) => {
  return knex.schema.createTable("message", (table) => {
    table.increments("id").primary().notNullable();
    table.string("message").notNullable();
    table.timestamp("created_at").notNullable().defaultTo(knex.fn.now());
  });
};

exports.down = (knex) => {
  return knex.schema.dropTable("message");
};
