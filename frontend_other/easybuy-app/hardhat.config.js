require('@nomicfoundation/hardhat-toolbox')
require('hardhat-deploy')
require('dotenv').config()

const { ALFAJORES_API_KEY, ALFAJORES_URL, PRIVATE_KEY } = process.env

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  defaultNetwork: 'hardhat',
  networks: {
    hardhat: {
      chainId: 31337,
    },
    localhost: {
      url: 'http://127.0.0.1:8545',
      chainId: 31337,
    },
    alfajores: {
      url: ALFAJORES_URL,
      accounts: [PRIVATE_KEY],
      chainId: 44787,
    },
  },
  solidity: {
    compilers: [
      {
        version: '0.8.9',
      },
      {
        version: '0.8.18',
      },
      {
        version: '0.8.7',
      },
      {
        version: '0.6.6',
      },
    ],
  },
  namedAccounts: {
    deployer: {
      default: 0, // Deployer is used to deploy the smart contract.
    },
  },
  paths: {
    artifacts: '../src/backend', // Specifies the directory where Hardhat stores the compiled contracts, artifacts and other data. Very important to use when interacting with the frontend.
  },
  // Etherscan to configure Etherscan API keys for different networks.
  etherscan: {
    apiKey: {
      alfajores: ALFAJORES_API_KEY,  // API Key for the alfajores network which allows us to verify out deployed contracts on the Etherscan block explorer.
    },
    customChains: [
      {
        network: 'alfajores',
        chainId: 44787,
        urls: {
          apiURL: 'https://api-alfajores.celoscan.io/api',
          browserURL: 'https://alfajores.celoscan.io/',
        },
      },
    ],
  },
}
