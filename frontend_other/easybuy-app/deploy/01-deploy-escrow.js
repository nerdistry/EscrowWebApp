const { network } = require('hardhat')
const { verifyContract } = require('../utils/verifyContract')

/*getNamedAccounts - function that retrieves the addresses of pre-configured accounts in the Hardhat config file.*/
module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deployer } = await getNamedAccounts() // Only interest: deploys the contract, retrieve by awaiting.

  const chainId = network.config.chainId

  const { deploy, log } = deployments

  const args = ['0xd3493C57528E086Afd51fe6fC2248958e3778feD','0x4b3178E74cF9F255FdCeD403497FaEB4E2270b43']
  const waitConfirmations = 1

  // Only verify the contract when we are deploying on celo test net
  const tx = await deploy('Escrow', {
    from: deployer,
    args: args,
    waitConfirmations: waitConfirmations, // Only proceed with deployment once the transaction has been confirmed by at least one node on the network.
    log: true,
  })
  log('Product Escrow contract deployed --------------')

  if (chainId != 31337) //Since we are deploying on the Celo Network.
  {
    log('Verifying the contract on celoscan...')
    await verifyContract(tx.address, args)
  }
}

module.exports.tags = ['all', 'deploy'] // Running npx hardhat deploy --tags deploy will execute this script.
