const asyncHandler = require('../middleware/async')
const ErrorResponse = require('../utils/errorResponse')
const dotenv = require('dotenv')
dotenv.config({path:'../config/config.env'})
const ethers = require('ethers')
const { BigNumber } = require('bignumber.js');


const ABI= require("../config/validationABI.json")



const ALCHEMY_RPC_URL_SEPOLIA='https://polygon-mumbai.g.alchemy.com/v2/VXKgUoP3v54T1vWEyZd1UqXlK2LRuggc'
const PRIVATE_KEY=process.env.PRIVATE_KEY;
const CONTRACT_VALIDATION_ADDRESS='0x1CfDb3a28f24251B56059B47a086ad5d5e420F04'

const provider = new ethers.providers.JsonRpcProvider(ALCHEMY_RPC_URL_SEPOLIA);
const signer = new ethers.Wallet(PRIVATE_KEY, provider);
const contractInstance = new ethers.Contract(CONTRACT_VALIDATION_ADDRESS, ABI, signer);


console.log(ALCHEMY_RPC_URL_SEPOLIA)
// INFURA_RPC_PROVIDER='https://sepolia.infura.io/v3/12d8279bb5a04bbabc47862d11820722'


//let walletSigner = signer.connect(window.ethersProvider)






exports.addProductDetail = asyncHandler(async (req, res, next) => {
    console.log("Polygon API calling")
  const tx = await contractInstance.addProduct('b');
  await tx.wait();

  res.status(200).json({
     success: true,
     transaction: tx
  });
});