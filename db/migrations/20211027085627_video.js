exports.up = (knex) => {
  return knex.schema.createTable("video", (table) => {
    table.increments("id").primary().notNullable();
    table.date("date").notNullable();
    table.string("title").notNullable();
    table.string("description").notNullable();
    table.string("video_url").notNullable();
    table.string("screenshot_url");
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
  return knex.schema.dropTable("video");
};
