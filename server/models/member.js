'use strict'

const knex = require('../knex')
const contractApi = require('../smart-contract')

const findMemberByAddress = async (memberAddress) => {
  return knex.select().from('members')
    .where('address', memberAddress)
    .first().then(getBalance)
    .then(getNumdoc)
}

const findMemberById = async (id) => {
  return knex.select().from('members')
    .where('id', id)
    .first()
    .then(getBalance)
    .then(getNumdoc)
}

const createNewMember = async (objData) => {
  return knex('members').insert(objData)
}

const getListMember = async ({ status = null, role = null }) => {
  let query = knex.select().from('members')
  if (status) {
    query = query.where('status', status)
  }
  if (role) {
    query = query.where('role', role)
  }
  return query
    .then(async (rows) => {
      return Promise.all(rows.map(async (row) => getBalance(row)))
    })
    .then(async (rows) => {
      return Promise.all(rows.map(async (row) => getNumdoc(row)))
    })
}

const changeStatus = async (id, status) => {
  return knex.select().table('members')
    .where('id', id)
    .update({ status })
}

const getAddressAdmin = async () => {
  return knex.select('address').table('members')
    .where('role', 'admin')
    .first()
}

async function getBalance (member) {
  if (!member) return null
  const balance = await contractApi.getBalance(member.address)
  return {
    ...member,
    balance
  }
}

async function getNumdoc (member) {
  if (!member) return null
  const result = await knex('documents')
    .count('id as numDoc')
    .where('owner', member.address).first()

  return {
    ...member,
    num_doc: result.numDoc
  }
}
module.exports = {
  findMemberByAddress,
  getListMember,
  changeStatus,
  createNewMember,
  getAddressAdmin,
  findMemberById
}
