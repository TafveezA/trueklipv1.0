
const asyncHandler = require('../middleware/async')
const ErrorResponse = require('../utils/errorResponse')
const dotenv = require('dotenv')
const CryptoJS = require('crypto-js');

dotenv.config({path:'../config/config.env'})
const{Web3}=require("web3")




const privateKey = process.env.PRIVATE_KEY; 
const supplychainABI = require("../config/validationABI.json")
const Product = require('../models/productModel.js')
const EOS_RPC_URL=process.env.EOS_RPC_URL;
const EOS_PROVIDER = new Web3(EOS_RPC_URL)
const abiSupplyChain =supplychainABI
const eoscontractAddress = process.env.EOS_SUPPLYCHAIN_CONTRACT_ADDRESS


console.log(privateKey)
const eosSupplyChainContract = new EOS_PROVIDER.eth.Contract(abiSupplyChain,eoscontractAddress);





// @desc  get  validation of product
// @route Get /api/eth/v1/validate
// @access Public

exports.validateProductOnEOS = asyncHandler(async(req,res,next)=>{
    const {truklipid} = req.body
    const result = await eosSupplyChainContract.methods.validationResult(truklipid).call()
    console.log(result)
    res.status(200).json({
        success:true,
        valid:result,
    })
})

exports.addProductOnEOS = asyncHandler(async(req,res,next)=>{
    
    const jsonData = req.body
    const truklipid=jsonData._truklipid;
    const jsonString = JSON.stringify(jsonData);
    const secretKey = "mySecretKey12345";
    const encryptedData = CryptoJS.AES.encrypt(jsonString, secretKey).toString();

console.log('Encrypted Data:', encryptedData);
let response = await eosSupplyChainContract.methods
            .addProductEncryptedData(truklipid,encryptedData)
            .send({ from: address, gas: 1000000 });
console.log(response)
// Sign the transaction
Web3.eth.accounts.signTransaction(response, privateKey)
  .then((signedTx) => {
    // Send the signed transaction
    Web3.eth.sendSignedTransaction(signedTx.rawTransaction)
      .on('transactionHash', (txHash) => {
        console.log('Transaction Hash:', txHash);
      })
      .on('receipt', (receipt) => {
        console.log('Transaction Receipt:', receipt);
      })
      .on('error', (error) => {
        console.error('Error sending transaction:', error);
      });
  })
  .catch((error) => {
    console.error('Error signing transaction:', error);
  });
// Decrypt the encrypted data back to a JSON string
console.log('Decrypted JSON:', decryptedJsonData);
const encryptedDataFromBlockchain = await eosSupplyChainContract.methods.getProductEncrytedData(truklipid).call()
const bytes = CryptoJS.AES.decrypt(encryptedDataFromBlockchain, secretKey);
const decryptedData = bytes.toString(CryptoJS.enc.Utf8);

console.log('Decrypted Data:', decryptedData);

// Parse the JSON string back to a JSON object
const decryptedJsonData = JSON.parse(decryptedData);




 
    res.status(200).json({
        success:true,
        valid:result,
        dataretrived:decryptedJsonData
    })
})



const eosjs = require('eosjs');
const { Api, JsonRpc, RpcError } = eosjs;
const fetch = require('node-fetch');
const { TextEncoder, TextDecoder } = require('util');


//const privateKey = process.env.PRIVATE_KEY; // Replace with your EOS private key
const rpc = new JsonRpc(process.env.EOS_RPC_URL, { fetch });

// Create an instance of the EOS contract
const SupplyChainContract = process.env.EOS_SUPPLYCHAIN_CONTRACT_ADDRESS; // Replace with your contract account name

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







