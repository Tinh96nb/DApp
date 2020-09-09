'use strict'
const knex = require('../knex')
const contractApi = require('../smart-contract')

const initDb = async () => {
  await knex('transactions').truncate()
  await knex('documents').truncate()
  await knex('members').truncate()
  await knex('categories').truncate()
}

const insertMembers = async () => {
  const members = await contractApi.getAccounts()
  const convertField = members.map((mem, index) => {
    if (index === 0) {
      return { address: mem, role: 'admin' }
    }
    return { address: mem, role: 'member' }
  })
  try {
    await knex('members').insert(convertField)
    await knex('categories').insert({ name: 'Others' })
    console.log('Insert members susscess!')
  } catch (error) {
    console.log('Import members error!')
  }
  return process.exit()
}

const init = async () => {
  await initDb()
  await insertMembers()
}
init()
