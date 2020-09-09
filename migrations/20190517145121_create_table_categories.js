exports.up = async function (knex, Promise) {
  await knex.schema.dropTableIfExists('categories')
  return knex.schema.createTable('categories', function (table) {
    table.increments()
    table.string('name', 30).unique()
    table.integer('sorder').nullable()
    table.timestamp('created_at').defaultTo(knex.fn.now())
  })
}
exports.down = function (knex, Promise) {
  return knex.schema.dropTable('categories')
}
