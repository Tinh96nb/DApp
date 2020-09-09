const express = require('express')
const router = express.Router()
const { saveToIpfs, getFromIpfs } = require('../helps/ipfs')
const { sha1 } = require('../helps/crypto')
const { statusDocument } = require('../helps/const')
const contractApi = require('../smart-contract')
const documentRepo = require('../models/document')

router.post('/', async function createDoc (req, res, next) {
  const {
    name = '',
    file_content = '',
    category = 1,
    size = 0,
    description = ''
  } = req.body
  if (!file_content.length) {
    return res.status(400).json({ message: 'File input is required!' })
  }
  if (!name.length) {
    return res.status(400).json({ message: 'Name file is required!' })
  }
  const base64File = file_content.split(',')[1]
  const hash = sha1(base64File)
  const ipfs = await saveToIpfs(base64File)
  const params = {
    address: res.locals.member.address,
    name: name,
    hash: hash,
    link: ipfs.link,
    linkCrypt: ipfs.linkCrypt,
    category: category,
    size,
    description
  }
  return contractApi.newDocument(params, res)
})

router.get('/', async function getListDoc (req, res, next) {
  const documents = await documentRepo.listDocument(req.query)
  res.json(documents)
})

router.get('/:id', async function getViewDoc (req, res, next) {
  const { id } = req.params
  const document = await documentRepo.getDocById(id)
  if (!document) {
    return res.status(400).json({ message: 'Document not found!' })
  }
  res.json(document)
})

router.delete('/:id', async function deleteDoc (req, res, next) {
  const { id } = req.params
  const document = await documentRepo.getDocById(id)
  if (!document) {
    return res.status(400).json({ message: 'Document not found!' })
  }
  const params = {
    docId: id,
    address: res.locals.member.address
  }
  contractApi.deleteDocument(params, res)
})

router.put('/:id', async function updateDoc (req, res, next) {
  const { id } = req.params
  const document = await documentRepo.getDocById(id)
  if (!document) {
    return res.status(400).json({ message: 'Document not found!' })
  }
  const {
    name = document.name,
    file_content = '',
    category = document.category_id,
    size = document.size,
    description = document.description
  } = req.body
  let hash; let ipfs = ''
  if (file_content.length) {
    const base64File = file_content.split(',')[1]
    hash = sha1(base64File)
    ipfs = await saveToIpfs(base64File)
  }
  const params = {
    docId: id,
    address: res.locals.member.address,
    name: name,
    hash: file_content.length ? hash : document.content_hash,
    linkCrypt: file_content.length ? ipfs.linkCrypt : document.link_ipfs_crypt,
    category: category,
    size,
    description
  }
  return contractApi.updateDocument(params, res)
})

router.post('/change-status', async function changeStatusDocument (req, res, next) {
  const { id, status } = req.body
  const listStatus = [statusDocument.PENDDING, statusDocument.CLOSED]
  if (!id) {
    return res.status(400).json({ message: 'Id is required!' })
  }
  if (listStatus.indexOf(parseInt(status, 10)) === -1) {
    return res.status(400).json({ message: 'Status is invalid!' })
  }
  const document = await documentRepo.getDocById(id)
  if (!document) {
    return res.status(400).json({ message: 'Document not found!' })
  }
  const address = res.locals.member.address
  const params = {
    id,
    address,
    status: parseInt(status, 10)
  }
  const cb = async (data) => {
    if (!data) { return res.status(400).json({ message: 'Can not change status!' }) }
    await documentRepo.changeStatus(id, data.status)
    const doc = await documentRepo.getDocById(id)
    return res.json(doc)
  }
  contractApi.changeStatusDocument(params, cb)
})

router.get('/file/:docId', async function downloadDoc (req, res, next) {
  const { docId } = req.params
  const docInfo = await documentRepo.getDocById(docId)
  if (!docInfo) {
    return res.status(400).json({ message: 'Document not found!' })
  }
  // neu status open hoac owner thi moi dc xem
  if (docInfo.status === statusDocument.ACEPTED ||
    docInfo.owner === res.locals.member.address
  ) {
    const base64File = await getFromIpfs(docInfo.link_ipfs_crypt)
    if (!base64File) {
    }
    res.setHeader('Content-Disposition', 'attachment; filename=' + docInfo.name)
    const download = Buffer.from(base64File.toString('utf-8'), 'base64')
    res.end(download)
  }
  return res.status(403).json({ message: `You don't have permission to access` })
})

module.exports = router
