'use strict'

const jwt = require('jsonwebtoken')
const secret = process.env.KEY_JWT || 'secret-key'

module.exports = {
  sign,
  verify,
  decode
}
const option = {
  algorithm: process.env.JWT_ALGORITHM || 'HS256',
  expiresIn: process.env.JWT_EXPIRES_IN ? `${process.env.JWT_EXPIRES_IN}d` : '30d',
  issuer: process.env.JWT_ISSUER || 'phamtinh'
}

function sign (payload) {
  const token = jwt.sign(payload, secret, option)
  return token
}

function verify (token) {
  try {
    return jwt.verify(token, secret)
  } catch (err) {
    return false
  }
}

function decode (token) {
  return jwt.decode(token, { complete: true })
}
