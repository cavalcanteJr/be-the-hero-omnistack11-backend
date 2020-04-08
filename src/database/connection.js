const knex = require('knex')
const configuration = require ('../../knexfile')

const confg = process.env.NODE_ENV === 'test' 
? configuration.test : configuration.development

const connection = knex(confg)

module.exports = connection