exports.up = (knex) => {
  return knex.schema.table("user", (table) => {
    table.boolean("is_admin").defaultTo(false);
  });
};

exports.down = (knex) => {
  return knex.schema.table("user", (table) => {
    table.dropColumn("is_admin");
  });
};
