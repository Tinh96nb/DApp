const ipfsClient = require('ipfs-http-client')
const ipfs = ipfsClient(process.env.IPFS_HOST, '5001', { protocol: 'http' })
const {
  encryptAes,
  decryptAes
} = require('../helps/crypto')

const saveToIpfs = async (base64File) => {
  const contentCrypt = encryptAes(base64File)
  const bufferContent = ipfs.Buffer.from(contentCrypt)
  return ipfs.add(bufferContent)
    .then((response) => {
      return {
        link: response[0].path,
        linkCrypt: encryptAes(response[0].path)
      }
    })
    .catch((err) => {
      console.error(err)
    })
}

const getFromIpfs = async (ipfsCrypt) => {
  const ipfsId = await decryptAes(ipfsCrypt)
  const file = await ipfs.get(ipfsId)
  if (file.length && file[0].content) {
    const content = file[0].content.toString()
    const contentBase64 = decryptAes(content)
    return contentBase64
  }
  return null
}

module.exports = {
  saveToIpfs,
  getFromIpfs
}
