const { http } = require("web3/lib/commonjs/providers.exports");

require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.18",
  gasReporter:{
    enabled:true,
    outputFile: 'gas-report.txt'
  },

  networks: {
    sepolia: {
      url: ``,
      accounts: [SEPOLIA_PRIVATE_KEY]
    },
    polygon: {
      url : `` ,
      accounts:PRIVATE_KEY !== undefined ? [PRIVATE_KEY] : [],
      gas: 2100000, gasPrice: 8000000000
     },
     hardhat: {
      chainId:2344,
      forking: {
        url:MAINNET_RPC_URL 
        }
    },
    ganache: {
        url: 'http://127.0.0.1:7545',
        accounts:'0x98a27ed1590b7881a369869e59715fbeb35d7003de88482187b7b7c7c97dc10a'
      }
    }
  }
  
  
};