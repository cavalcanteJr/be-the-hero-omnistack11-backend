
exports.up = function(knex) {
  return knex.schema.createTable('ongs', function (table) {
      table.string('id').unique()
      table.string('name').notNullable()
      table.string('email').unique().primary()
      table.string('password').notNullable()
      table.string('whatsapp').notNullable()
      table.string('city').notNullable()
      table.string('uf', 2).notNullable()
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('ongs')
};
