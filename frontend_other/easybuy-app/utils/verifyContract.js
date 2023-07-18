const { run } = require('hardhat')

const verifyContract = async (contractAddress, args) => {
  console.log('Verifying contract...')
  try {
    await run('verify:verify', {
      address: contractAddress,
      constructorArguments: args
    })

    console.log('Contract verified!')
  } catch (err) {
    console.log(err)
  }
}

module.exports = { verifyContract }
