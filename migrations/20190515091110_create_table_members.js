exports.up = async function (knex, Promise) {
  await knex.schema.dropTableIfExists('members')
  return knex.schema.createTable('members', function (table) {
    table.increments()
    table.string('address', 42).unique()
    table.string('role', 10).defaultTo('member')
    table.integer('status').defaultTo(1)
    table.timestamp('created_at').defaultTo(knex.fn.now())
  })
}
exports.down = function (knex, Promise) {
  return knex.schema.dropTable('members')
}
