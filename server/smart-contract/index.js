const { web3, getContract } = require('../../ethereum/provider')
const { statusDocument } = require('../helps/const')
const documentRepo = require('../models/document')
const transRepo = require('../models/transaction')

module.exports = {
  getAccounts,
  getBalance,
  newDocument,
  grantDocument,
  changeStatusDocument,
  createNewAcc,
  deleteDocument,
  updateDocument,
  transferToMember,
  getLatestBlock
}

async function getAccounts () {
  return web3.eth.getAccounts()
}

async function getLatestBlock (number = 10) {
  const numberBlock = await web3.eth.getBlockNumber()
  const blocks = []
  const transactions = []
  for (let i = 0; i < numberBlock; i++) {
    const block = await web3.eth.getBlock(numberBlock - i)
    if (block) {
      blocks.push(block)
      block.transactions.forEach(async trans => {
        transactions.push(await web3.eth.getTransaction(trans))
      })
    }
  }
  return { blocks, transactions }
}

async function getBalance (address) {
  const gwei = await web3.eth.getBalance(address)
  return web3.utils.fromWei(gwei, 'ether')
}

async function newDocument (params, res) {
  const contract = await getContract()
  contract.methods
    .newDocument(params.name, params.hash, params.linkCrypt, params.category)
    .send({ from: params.address, gas: 3000000 }, async (err, tranHash) => {
      if (err) {
        console.log(err)
        res.status(400).json({ message: 'Can not mined to blockchain' })
      }
      const docInfoFromBC = await contract.methods.getLatestDocument().call({ from: params.address })
      const objDoc = {
        id: docInfoFromBC.documentId.toString(),
        owner: docInfoFromBC.owner,
        name: docInfoFromBC.name,
        content_hash: docInfoFromBC.contentHash,
        link_ipfs_crypt: docInfoFromBC.linkIpfsCrypt,
        category_id: docInfoFromBC.category.toString(),
        status: docInfoFromBC.status,
        size: params.size,
        description: params.description
      }
      await documentRepo.createDocument(objDoc)
      const transaction = await web3.eth.getTransactionReceipt(tranHash)
      const objTrans = {
        document_id: objDoc.id,
        trans_hash: transaction.transactionHash,
        block_number: transaction.blockNumber,
        block_hash: transaction.blockHash,
        from: transaction.from,
        gas_used: transaction.gasUsed,
        status: transaction.status
      }
      await transRepo.createTrans(objTrans)
      const result = await documentRepo.getDocById(objDoc.id)
      res.json({ ...result, linkIpfs: params.link })
    })
}

async function grantDocument (params, cb) {
  const contract = await getContract()
  contract.methods
    .grantDocument(params.id, params.status)
    .send({ from: params.address, gas: 3000000 }, async (err, tranHash) => {
      if (err) {
        console.log(err)
        return cb(null)
      }
      const res = {
        status: params.status
      }
      return cb(res)
    })
}

async function changeStatusDocument (params, cb) {
  const contract = await getContract()
  const res = async (err, tranHash) => {
    if (err) {
      console.log(err)
      return cb(null)
    }
    const res = {
      status: params.status
    }
    return cb(res)
  }
  if (params.status === statusDocument.CLOSED) {
    contract.methods
      .privateDocument(params.id)
      .send({ from: params.address, gas: 3000000 }, res)
  } else if (params.status === statusDocument.PENDDING) {
    contract.methods.publicDocument(params.id)
      .send({ from: params.address, gas: 3000000 }, res)
  }
}

async function deleteDocument (params, res) {
  const contract = await getContract()
  contract.methods
    .deleteDocument(params.docId)
    .send({ from: params.address, gas: 3000000 }, async (err, tranHash) => {
      if (err) {
        console.log(err)
      }
      await documentRepo.deleteDocument(params.docId)
      await transRepo.deleteTrans(params.docId)
      res.json(params.docId)
    })
}

async function updateDocument (params, res) {
  const contract = await getContract()
  contract.methods
    .updateDocument(params.docId, params.name, params.hash, params.linkCrypt, params.category)
    .send({ from: params.address, gas: 3000000 }, async (err, tranHash) => {
      if (err) {
        console.log(err)
        res.status(400).json({ message: 'Can not mined to blockchain' })
      }
      const docInfoFromBC = await contract.methods.getDocumentByIndex(params.docId).call({ from: params.address })
      const objDoc = {
        owner: docInfoFromBC.owner,
        name: docInfoFromBC.name,
        content_hash: docInfoFromBC.contentHash,
        link_ipfs_crypt: docInfoFromBC.linkIpfsCrypt,
        category_id: params.category,
        status: statusDocument.PENDDING,
        size: params.size,
        description: params.description
      }
      await documentRepo.updateDocument(params.docId, objDoc)
      const transaction = await web3.eth.getTransactionReceipt(tranHash)
      const objTrans = {
        trans_hash: transaction.transactionHash,
        block_number: transaction.blockNumber,
        block_hash: transaction.blockHash,
        from: transaction.from,
        gas_used: transaction.gasUsed,
        status: transaction.status
      }
      await transRepo.updateTrans(params.docId, objTrans)
      const result = await documentRepo.getDocById(params.docId)
      res.json({ ...result, linkIpfs: params.link })
    })
}

async function createNewAcc (params, cb) {
  const accInfo = await web3.eth.accounts.create()
  web3.eth.sendTransaction({
    from: params.addressAdmin,
    to: accInfo.address,
    value: web3.utils.toWei(params.amount, 'ether')
  }, function (error, hash) {
    if (error) cb(null)
    const result = {
      address: accInfo.address,
      privateKey: accInfo.privateKey
    }
    cb(result)
  })
}

function transferToMember (params, cb) {
  web3.eth.sendTransaction({
    from: params.addressAdmin,
    to: params.address,
    value: web3.utils.toWei(params.amount, 'ether')
  }, function (error, hash) {
    if (error) cb(null)
    return cb(hash)
  })
}
