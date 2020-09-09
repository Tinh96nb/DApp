const Web3 = require('web3')
const contractJSON = require('./build/contracts/DocumentManager.json')

const web3 = new Web3(new Web3.providers.HttpProvider(`http://ganache:${process.env.GANACHE_PORT}`))

async function getContract () {
  const networkId = await web3.eth.net.getId()
  const deployedAddress = contractJSON.networks[networkId].address
  return new web3.eth.Contract(contractJSON.abi, deployedAddress)
}
module.exports = {
  web3,
  getContract
}
