const asyncHandler = require('../middleware/async')
const ErrorResponse = require('../utils/errorResponse')
const dotenv = require('dotenv')

dotenv.config({path:'../config/config.env'})
const CryptoJS = require('crypto-js');

const{Web3}=require("web3")
const ABI= require("../config/validationABI.json")


const Product = require('../models/productModel.js')
const ALCHEMY_RPC_URL_SEPOLIA=process.env.ALCHEMY_RPC_URL_SEPOLIA

const CONTRACT_VALIDATION_ADDRESS=process.env.CONTRACT_ADDRESS_VALIDATION

const web3 =new Web3(ALCHEMY_RPC_URL_SEPOLIA)
const contract = new web3.eth.Contract(ABI,CONTRACT_VALIDATION_ADDRESS)
const privateKey=process.env.PRIVATE_KEY;


// @desc  get  validation of product
// @route Get /api/eth/v1/validate
// @access Public
exports.validateProduct = asyncHandler(async(req,res,next)=>{
    const {truklipid}= req.body
    console.log(truklipid)
    // const product = await Product.findById(id)
    // console.log("Product ", product)
    
    const result = await contract.methods.validationResult(truklipid).call();

    console.log("Valid",result)
                  
     res.status(200).json({
      truklipId:truklipid,
      success:true,
      valid:result
     })
    
})

exports.addProductDetails = asyncHandler(async(req,res,next)=>{
    
    const jsonData = req.body
    const truklipid=jsonData._truklipid;
    const jsonString = JSON.stringify(jsonData);
    const secretKey = "mySecretKey12345";
    const encryptedData = CryptoJS.AES.encrypt(jsonString, secretKey).toString();
    console.log("Private Key",privateKey)

console.log('Encrypted Data:', encryptedData);


  const encodedData = contract.methods.addProductEncryptedData(truklipid, encryptedData).encodeABI();

  // Sign the transaction
  web3.eth.accounts.signTransaction(
    {
      to: contractAddress,
      data: encodedData,
      gas: '100000', // You may need to adjust the gas limit
    },
    privateKey
  )
    .then((signedTx) => {
      // Send the signed transaction
      web3.eth.sendSignedTransaction(signedTx.rawTransaction)
        .on('receipt', (receipt) => {
          console.log('Transaction receipt:', receipt);
          // Transaction has been mined
        })
        .on('error', (error) => {
          console.error('Transaction error:', error);
        });
    })
    .catch((error) => {
      console.error('Transaction signing error:', error);
    });

// Decrypt the encrypted data back to a JSON string
console.log('Decrypted JSON:', decryptedJsonData);
const encryptedDataFromBlockchain = await contract.methods.getProductEncrytedData(truklipid).call()
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
