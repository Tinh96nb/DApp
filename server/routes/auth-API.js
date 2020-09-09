const express = require('express')
const router = express.Router()
const jwt = require('../helps/jwt')
const memberRepo = require('../models/member')

router.post('/login', async (req, res) => {
  if (!req.body) {
    return res.status(400).json({ message: 'Address is required.' })
  }
  const { address } = req.body
  if (!address) {
    return res.status(400).json({ message: 'Address is required.' })
  }
  const user = await memberRepo.findMemberByAddress(address)
  if (!user) {
    return res.status(400).json({ message: `You don't have permission to access. Please contact administrator for more information` })
  }
  if (user.status === 0) {
    return res.status(400).json({ message: `This account has been blocked` })
  }
  const payload = {
    id: user.id,
    address: user.address
  }
  const jwtToken = jwt.sign({ payload })
  res.json({ token: jwtToken })
})

module.exports = router
