
exports.up = function(knex, Promise) {
  return knex.schema.createTable('mountain', (table) => {
    table.increments();
    table.text('title');
    table.text('range');
    table.float('rating');
    table.integer('elevation');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('mountain');
};
