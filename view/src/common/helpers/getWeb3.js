import Web3 from 'web3'

export async function getWeb3 () {
  if (window.ethereum) {
    const web3 = new Web3(window.ethereum)
    await window.ethereum.enable()
    return web3
  } else {
    return null
  }
}
