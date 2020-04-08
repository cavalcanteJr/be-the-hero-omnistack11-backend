
exports.up = function(knex) {
    return knex.schema.createTable('incidents', function (table) {
        table.increments()
        table.string('title').notNullable()
        table.string('description').notNullable()
        table.decimal('value').notNullable()
        table.string('imageurl')
        table.string('filename')

        table.string('ong_email').notNullable()

        table.foreign('ong_email').references('email').inTable('ongs')
    })
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('incidents')
  };
  