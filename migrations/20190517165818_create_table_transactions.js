exports.up = async function (knex, Promise) {
  await knex.schema.dropTableIfExists('transactions')
  return knex.schema.createTable('transactions', function (table) {
    table.increments()
    table.integer('document_id').unsigned()
    table.string('trans_hash')
    table.integer('block_number')
    table.string('block_hash')
    table.string('from')
    table.integer('gas_used')
    table.integer('status')
    table.timestamp('created_at').defaultTo(knex.fn.now())
  })
}
exports.down = function (knex, Promise) {
  return knex.schema.dropTable('transactions')
}
