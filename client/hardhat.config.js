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
    }
  }
  
  
};