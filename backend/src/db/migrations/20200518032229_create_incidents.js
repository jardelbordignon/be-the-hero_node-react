

exports.up = function(knex, Promise) {
    return knex.schema.createTable('incidents', function(t){
      t.increments();

      t.string('title').notNullable();
      t.string('description').notNullable();
      t.decimal('value').notNullable();

      t.string('ong_id').notNullable();
      t.foreign('ong_id').references('id').inTable('ongs');
    });
  };

/*
  exports.up = function(knex, Promise) {
    return knex.schema.createTable('users', (table) => {
      console.info("------> Creating table");
      table.increments('id').unsigned().primary();
      table.string('username').unique().notNullable();
      table.string('password').notNullable();
      table.timestamp('modified').notNullable();
      table.timestamp('created').notNullable().defaultTo(knex.raw('NOW()'));
  })
  .raw(onUpdateTrigger('users'))
  .raw(onInsertTrigger('users'));   
  }
*/
  exports.down = function(knex, Promise) {
    return knex.schema.dropTable('incidents');
  };