const mountains = require('../mountains');

exports.seed = function(knex, Promise) {
  return knex('mountain').del()
    .then(function () {
      return knex('mountain').insert(mountains);
    });
};
