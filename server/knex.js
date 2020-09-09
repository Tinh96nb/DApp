'use strict'

const knex = require('knex')(exportConfig())

module.exports = knex

function exportConfig () {
  const environment = 'development'
  return require('../knexfile')[environment]
}
