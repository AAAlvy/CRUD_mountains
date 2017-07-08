const knex = require('./knex'); //the connection

module.exports = {
  getAll() {
    return knex('mountain');
  },
  getOne(id) {
    return knex('mountain').where('id', id).first();
  },
  create(mountain) {
    return knex('mountain').insert(mountain, '*');
  },
  update(id, mountain) {
    return knex('mountain').where('id', id).update(mountain, '*');
  },
  delete(id) {
    return knex('mountain').where('id', id).del();
  }
};
