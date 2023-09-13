const asyncHandler = require('../middleware/async')
const ErrorResponse = require('../utils/errorResponse')
const dotenv = require('dotenv')

dotenv.config({path:'../config/config.env'})

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

console.log('Encrypted Data:', encryptedData);
let response = await contract.methods
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
