
const asyncHandler = require('../middleware/async')
const ErrorResponse = require('../utils/errorResponse')
const dotenv = require('dotenv')
const CryptoJS = require('crypto-js');

dotenv.config({path:'../config/config.env'})


const eosjs = require('eosjs');
const { Api, JsonRpc, RpcError } = eosjs;
const fetch = require('node-fetch');
const { TextEncoder, TextDecoder } = require('util');




//const privateKey = process.env.PRIVATE_KEY; 
//const supplychainABI = require("../config/validationABI.json")
const EOS_RPC_URL=process.env.EOS_RPC_URL;
//const abiSupplyChain =supplychainABI
const eoscontractAddress = process.env.EOS_SUPPLYCHAIN_CONTRACT_ADDRESS

const ethers = require('ethers')
const { BigNumber } = require('bignumber.js');


const ABI= require("../config/validationABI.json")



const ALCHEMY_RPC_URL_SEPOLIA=EOS_RPC_URL
const PRIVATE_KEY=process.env.PRIVATE_KEY;
const CONTRACT_VALIDATION_ADDRESS='0x52667A019f91831139D22a5F3C80af42dbA0228C'

const provider = new ethers.providers.JsonRpcProvider(ALCHEMY_RPC_URL_SEPOLIA);
const signer = new ethers.Wallet(PRIVATE_KEY, provider);
const contractInstance = new ethers.Contract(CONTRACT_VALIDATION_ADDRESS, ABI, signer);



//const eosSupplyChainContract = new EOS_PROVIDER.eth.Contract(abiSupplyChain,eoscontractAddress);





// @desc  get  validation of product
// @route Get /api/eth/v1/validate
// @access Public

exports.validateProductOnEOS = asyncHandler(async(req,res,next)=>{
    const {truklipid} = req.body
    const tx = await contractInstance.validationResult(truklipid)
  
    console.log(tx)
    res.status(200).json({
        success:true,
        valid:tx,
    })
})

exports.addProductOnEOS = asyncHandler(async(req,res,next)=>{
  
  const tx = await contractInstance.addProduct('b');
  await tx.wait();

  res.status(200).json({
     success: true,
     transaction: tx
  });
})





//const privateKey = process.env.PRIVATE_KEY; // Replace with your EOS private key
const rpc = new JsonRpc(process.env.EOS_RPC_URL, { fetch });

// Create an instance of the EOS contract
// const SupplyChainContract = process.env.EOS_SUPPLYCHAIN_CONTRACT_ADDRESS; 

exports.addProduct = async (req, res, next) => {
  try {
    const jsonData = req.body;
    const truklipid = jsonData._truklipid;
    const jsonString = JSON.stringify(jsonData);
    const secretKey = "mySecretKey12345";
    const encryptedData = CryptoJS.AES.encrypt(jsonString, secretKey).toString();
  
    console.log('Encrypted Data:', encryptedData);
  
    // Send the transaction to the EOS blockchain
    const api = new Api({
      rpc,
      signatureProvider: [privateKey], // Sign the transaction with your private key
      textEncoder: new TextEncoder(),
      textDecoder: new TextDecoder(),
    });
  
    const result = await api.transact({
      actions: [{
        account: eosSupplyChainContract,
        name: 'addProductEncryptedData', // Replace with your contract's action name
        authorization: [{
          actor: 'your-eos-account', // Replace with your EOS account name
          permission: 'active',
        }],
        data: {
          truklipid,
          encrypted_data: encryptedData,
        },
      }],
    }, {
      blocksBehind: 3,
      expireSeconds: 30,
    });
  
    console.log('Transaction Response:', result);
  
    // Decrypt the encrypted data back to a JSON string
    const encryptedDataFromBlockchain = await eosSupplyChainContract.methods.getProductEncrytedData(truklipid).call();
    const bytes = CryptoJS.AES.decrypt(encryptedDataFromBlockchain, secretKey);
    const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
  
    console.log('Decrypted Data:', decryptedData);
  
    // Parse the JSON string back to a JSON object
    const decryptedJsonData = JSON.parse(decryptedData);
  
    res.status(200).json({
      success: true,
      valid: result,
      dataretrived: decryptedJsonData
    });
  } catch (error) {
    console.error('Error:', error);
    next(error);
  }
};







