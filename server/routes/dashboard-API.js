const express = require('express')
const router = express.Router()
const contractApi = require('../smart-contract')
const documentRepo = require('../models/document')

router.get('/sumary', async function sumary (req, res) {
  const sumary = await documentRepo.sumary()
  res.json(sumary)
})

router.get('/blockchain', async (req, res) => {
  const objBlockchain = await contractApi.getLatestBlock(10)
  return res.json(objBlockchain)
})

module.exports = router
