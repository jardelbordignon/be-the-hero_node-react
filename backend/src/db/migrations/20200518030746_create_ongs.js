let knex = require('knex');

exports.up = function(knex, Promise) {
  return knex.schema.createTable('ongs', function(t){
    t.string('id', 5).primary();
    t.string('name', 30).notNullable();
    t.string('email', 100).notNullable();
    t.string('whatsapp', 15).notNullable();
    t.string('city', 40).notNullable();
    t.string('uf', 2).notNullable();
    t.timestamps();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('ongs');
};
