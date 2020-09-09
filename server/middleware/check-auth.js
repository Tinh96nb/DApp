const jwt = require('../helps/jwt')
const memberRepo = require('../models/member')

const checkAuth = () => async (req, res, next) => {
  let requestToken = ''
  const accessToken = req.query.access_token
  if (accessToken) {
    requestToken = accessToken
  } else {
    if (!req.headers || !req.headers.authorization) {
      return res.status(401).json({ message: 'Token is required!' })
    }
    requestToken = req.headers.authorization.split(' ')[1]
  }
  // check valid token
  const token = jwt.verify(requestToken)
  if (!token) {
    res.status(401).json({ message: 'Token is invalid!' })
    return false
  }
  // check in database
  const { payload } = token
  const mem = await memberRepo.findMemberByAddress(payload.address)
  if (mem) {
    res.locals.member = mem
    return next()
  }
  res.status(403).json({ message: `You don't have permission to access` })
  return false
}
module.exports = checkAuth()
