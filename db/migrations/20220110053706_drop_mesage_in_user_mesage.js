exports.up = (knex) => {
  return knex.schema.table("users_message", (table) => {
    table.dropColumn("message");
  });
};

exports.down = (knex) => {};
