/** @type import('hardhat/config').HardhatUserConfig */

const { task } = require('hardhat/config');

require("@nomiclabs/hardhat-waffle");
task  ("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts){
    console.log(account.address);
  }
});

module.exports = {
  solidity: "0.8.18",
  paths: {
    artifacts: './src/artifacts',
  },
  networks: {
    hardhat: {
      chainId: 1337,
    },
    localhost: {
      url: "http://127.0.0.1:8545"
    }
  }
};

