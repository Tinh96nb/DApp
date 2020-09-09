const cryptoJS = require('crypto-js')

const key = '123456'

function encryptAes (data) {
  return cryptoJS.AES.encrypt(data, key).toString()
}

function decryptAes (ciphertext) {
  var bytes = cryptoJS.AES.decrypt(ciphertext.toString(cryptoJS.enc.Utf8), key)
  return bytes.toString(cryptoJS.enc.Utf8)
}

function sha1 (text) {
  return cryptoJS.SHA1(text).toString()
}

module.exports = { decryptAes, encryptAes, sha1 }
