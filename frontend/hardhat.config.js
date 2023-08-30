/** @type import('hardhat/config').HardhatUserConfig */
require("@nomicfoundation/hardhat-toolbox");
require('hardhat-gas-reporter');
require("dotenv").config();
const ALCHEMY_API_KEY = process.env.ALCHEMY_API_KEY
const SEPOLIA_PRIVATE_KEY = process.env.SEPOLIA_PRIVATE_KEY;
const POLYGON_TESTNET_RPC_URL= process.env.POLYGON_TESTNET_RPC_URL;
const PRIVATE_KEY=process.env.PRIVATE_KEY;
const MAINNET_RPC_URL = process.env.MAINNET_RPC_URL;

module.exports = {
  solidity: "0.8.18",
  gasReporter:{
    enabled:false,
    outputFile: 'gas-report.txt'
  },

  networks: {
    sepolia: {
      url: `https://eth-sepolia.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
      accounts: [SEPOLIA_PRIVATE_KEY]
    },
    polygon: {
      url : POLYGON_TESTNET_RPC_URL ,
      accounts:PRIVATE_KEY !== undefined ? [PRIVATE_KEY] : [],
      gas: 2100000, gasPrice: 8000000000
     },
     hardhat: {
      chainId:2344,
      forking: {
        url:MAINNET_RPC_URL 
        }
    },
    eosevm: {
      url: "https://api.evm.eosnetwork.com",
      accounts:[PRIVATE_KEY],
  },
    eosevm_testnet: {
      url: "https://api.testnet.evm.eosnetwork.com",
      accounts:[PRIVATE_KEY],
  }
  }
  
  
};