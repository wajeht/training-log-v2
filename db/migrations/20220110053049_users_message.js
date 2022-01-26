exports.up = (knex) => {
  return knex.schema.createTable("users_message", (table) => {
    table
      .integer("sender_id")
      .references("id")
      .inTable("user")
      .onDelete("cascade")
      .index();
    table
      .integer("receiver_id")
      .references("id")
      .inTable("user")
      .onDelete("cascade")
      .index();
    table
      .integer("message_id")
      .references("id")
      .inTable("message")
      .onDelete("cascade")
      .index();
  });
};

exports.down = (knex) => {
  return knex.schema.dropTable("users_message");
};
