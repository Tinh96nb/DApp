exports.up = async function (knex, Promise) {
  await knex.schema.dropTableIfExists('documents')
  return knex.schema.createTable('documents', function (table) {
    table.integer('id').unsigned().unique().primary()
    table.string('name')
    table.string('owner', 42)
    table.string('content_hash')
    table.string('link_ipfs_crypt')
    table.integer('size')
    table.string('description')
    table.integer('category_id').unsigned()
    table.integer('status')
    table.timestamp('created_at').defaultTo(knex.fn.now())
  })
}
exports.down = function (knex, Promise) {
  return knex.schema.dropTable('documents')
}
