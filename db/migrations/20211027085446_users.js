exports.up = (knex) => {
  return knex.schema.createTable("user", (table) => {
    table.increments("id").primary().notNullable();
    table.string("name").notNullable();
    table.integer("age").notNullable();
    table.integer("weight").notNullable();
    table.string("gender").notNullable();
    table.string("username").notNullable().unique();
    table.string("password").notNullable();
    table.string("email").notNullable().unique();
    table.string("biography");
    table.string("profile_picture_url").defaultTo("/images/rick.jpg");
    table.timestamps();
  });
};

exports.down = (knex) => {
  return knex.schema.dropTable("user");
};
