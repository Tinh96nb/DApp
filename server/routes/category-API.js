const express = require('express')
const router = express.Router()
const categoryRepo = require('../models/category')

router.get('/', async (req, res, next) => {
  const categories = await categoryRepo.listCategory()
  res.json(categories)
})

module.exports = router
