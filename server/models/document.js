'use strict'

const knex = require('../knex')

const listDocument = async ({ name = null, owner = null, category_id = null, status = null }) => {
  let query = knex.select().from('documents')
  if (name) {
    query = query.where('name', 'like', `%${name}%`)
  }
  if (owner) {
    query = query.where('owner', owner)
  }
  if (status) {
    query = query.where('status', status)
  }
  if (category_id) {
    query = query.where('category_id', category_id)
  }
  return query.then(async (rows) => {
    return Promise.all(rows.map(async (row) => addColumnTrans(row)))
  })
}

const getDocById = async (id) => {
  return knex.select().table('documents').where('id', id).first().then(addColumnTrans)
}

const createDocument = async (objectData) => {
  return knex('documents').insert(objectData)
}

const changeStatus = async (id, status) => {
  return knex.select().table('documents')
    .where('id', id)
    .update({ status })
}

const updateDocument = async (id, objectData) => {
  return knex.select().table('documents')
    .where('id', id)
    .update(objectData)
}

const deleteDocument = async (id) => {
  return knex.select().table('documents')
    .where('id', id)
    .del()
}

async function addColumnTrans (row) {
  if (!row) {
    return null
  }
  const transaction = await knex.select()
    .from('transactions')
    .where('document_id', row.id)
    .first()
  const categoryName = await knex.select('name')
    .from('categories')
    .where('id', row.category_id)
    .first()
  return {
    ...row,
    transaction,
    category_name: (categoryName && categoryName.name) || ''
  }
}
const sumary = async () => {
  const numDoc = await knex('documents').count('id as number').first()
  const numMem = await knex('members').count('id as number').first()
  const numCate = await knex('categories').count('id as number').first()
  return {
    document: numDoc.number,
    member: numMem.number,
    category: numCate.number
  }
}

module.exports = {
  listDocument,
  getDocById,
  createDocument,
  changeStatus,
  updateDocument,
  deleteDocument,
  sumary
}
