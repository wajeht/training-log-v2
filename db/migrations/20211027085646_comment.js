exports.up = (knex) => {
  return knex.schema.createTable("comment", (table) => {
    table.increments("id").primary().notNullable();
    table.date("date", { precision: 6 }).defaultTo(knex.fn.now(6));
    table.string("comment").notNullable();
    table
      .integer("video_id")
      .references("id")
      .inTable("video")
      .onDelete("cascade")
      .index();
    table
      .integer("user_id")
      .references("id")
      .inTable("user")
      .onDelete("cascade")
      .index();
    table.timestamps();
  });
};

exports.down = (knex) => {
  return knex.schema.dropTable("comment");
};
