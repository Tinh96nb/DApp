const express = require('express')
const router = express.Router()
const contractApi = require('../smart-contract')
const categoryRepo = require('../models/category')
const { statusDocument } = require('../helps/const')
const docRepo = require('../models/document')
const memberRepo = require('../models/member')

router.post('/member', async function createMember (req, res, next) {
  const { amount } = req.body
  const addressAdmin = res.locals.member.address
  const cb = async (data) => {
    if (!data) return res.status(400).json({ message: 'Can not create account!' })
    await memberRepo.createNewMember({ address: data.address })
    const member = await memberRepo.findMemberByAddress(data.address)
    const result = {
      ...member,
      ...data
    }
    res.json(result)
  }
  contractApi.createNewAcc({ addressAdmin, amount }, cb)
})

router.post('/member/change-status', async function changeStatusMember (req, res, next) {
  const { id, status } = req.body
  if (!id) {
    return res.status(400).json({ message: 'Id is required!' })
  }
  const result = await memberRepo.changeStatus(id, status)
  if (!result) {
    return res.status(400).json({ message: 'Can not change status!' })
  }
  const mem = await memberRepo.findMemberById(id)
  res.json(mem)
})

router.post('/member/transfer', async function transferEthToMember (req, res, next) {
  const { address, amount = 10 } = req.body
  const addressAdmin = res.locals.member.address
  const params = {
    addressAdmin,
    address,
    amount
  }
  const cb = async (data) => {
    if (!data) { return res.status(400).json({ message: 'Can not transfer!' }) }
    const mem = await memberRepo.findMemberByAddress(address)
    return res.json(mem)
  }
  contractApi.transferToMember(params, cb)
})

router.post('/document/change-status', async function changeStatusDocument (req, res, next) {
  const { id, status } = req.body
  const listStatus = [statusDocument.ACEPTED, statusDocument.REJECTED]
  if (!id) {
    return res.status(400).json({ message: 'Id is required!' })
  }
  const document = await docRepo.getDocById(id)
  if (!document) {
    return res.status(400).json({ message: 'Document not found!' })
  }
  if (document.status === statusDocument.CLOSED) {
    return res.status(400).json({ message: 'Document was closed' })
  }
  if (listStatus.indexOf(parseInt(status, 10)) === -1) {
    return res.status(400).json({ message: 'Status is invalid!' })
  }
  const address = res.locals.member.address
  const params = {
    id,
    address,
    status
  }
  const cb = async (data) => {
    if (!data) { return res.status(400).json({ message: 'Can not change status!' }) }
    await docRepo.changeStatus(id, data.status)
    const doc = await docRepo.getDocById(id)
    return res.json(doc)
  }
  contractApi.grantDocument(params, cb)
})

router.post('/categories/', async function createCategory (req, res, next) {
  const { name } = req.body
  if (!name) {
    return res.status(400).json({ message: 'Name is required!' })
  }
  try {
    const result = await categoryRepo.createCategory({ name })
    const category = await categoryRepo.getCategoryById(result)
    return res.json(category)
  } catch (error) {
    res.status(400).json({ message: 'Can not create category!' })
  }
})

router.delete('/categories/:id', async function deleteCategory (req, res, next) {
  const { id } = req.params
  const category = await categoryRepo.getCategoryById(id)
  if (!category) { res.status(400).json({ message: 'Not found categrory id!' }) }
  const result = await categoryRepo.deleteCategory(id)
  if (!result) { return res.status(400).json({ message: 'Can not delete category!' }) }
  return res.json(id)
})

router.put('/categories/:id', async function updateCategory (req, res, next) {
  const { id } = req.params
  const { name } = req.body
  if (!name) {
    return res.status(400).json({ message: 'Name is required!' })
  }
  const category = await categoryRepo.getCategoryById(id)
  if (!category) { res.status(400).json({ message: 'Not found categrory id!' }) }
  const result = await categoryRepo.updateCategory(id, { name })
  if (!result) { return res.status(400).json({ message: 'Can not update category!' }) }

  const infoNew = await categoryRepo.getCategoryById(id)
  return res.json(infoNew)
})

module.exports = router
