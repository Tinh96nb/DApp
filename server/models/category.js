'use strict'

const knex = require('../knex')

const listCategory = async () => {
  return knex.select().from('categories').then(async (rows) => {
    return Promise.all(rows.map(async (row) => getNumDoc(row)))
  })
}

const getCategoryById = async (id) => {
  return knex.select().from('categories').where('id', id).first().then(getNumDoc)
}

const createCategory = async (objectData) => {
  return knex('categories').insert(objectData)
}

const updateCategory = async (id, objectData) => {
  return knex.select().table('categories')
    .where('id', id)
    .update(objectData)
}

const deleteCategory = async (id) => {
  return knex.select().table('categories')
    .where('id', id)
    .del()
}

async function getNumDoc (category) {
  if (!category) return null
  const result = await knex('documents').count('id as numDoc').where('category_id', category.id).first()
  return {
    ...category,
    num_doc: result.numDoc
  }
}
module.exports = {
  listCategory,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory
}
