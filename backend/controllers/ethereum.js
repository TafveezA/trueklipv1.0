const asyncHandler = require('../middleware/async')
const ErrorResponse = require('../utils/errorResponse')
const dotenv = require('dotenv')

dotenv.config({path:'../config/config.env'})
const CryptoJS = require('crypto-js');
const ethers = require('ethers')

const{Web3}=require("web3")
const ABI= require("../config/validationABI.json")
const { JsonRpcProvider } = require("@ethersproject/providers")


const Product = require('../models/productModel.js')
const ALCHEMY_RPC_URL_SEPOLIA=process.env.ALCHEMY_RPC_URL_SEPOLIA
const PRIVATE_KEY=process.env.PRIVATE_KEY;
const CONTRACT_VALIDATION_ADDRESS=process.env.CONTRACT_ADDRESS_VALIDATION


console.log(ALCHEMY_RPC_URL_SEPOLIA)
const alchemyProvider = new JsonRpcProvider(ALCHEMY_RPC_URL_SEPOLIA)
const signer = new ethers.Wallet(PRIVATE_KEY,alchemyProvider)

const web3 =new Web3(ALCHEMY_RPC_URL_SEPOLIA)
const contract = new web3.eth.Contract(ABI,CONTRACT_VALIDATION_ADDRESS)


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
  const jsonData = req.body;
  console.log(jsonData)
  const truklipid = jsonData._truKlipId;
  console.log("truklipid",truklipid)
  const jsonString = JSON.stringify(jsonData);
  const secretKey = "mySecretKey12345";
  const encryptedData = CryptoJS.AES.encrypt(jsonString, secretKey).toString();
  
  console.log('Encrypted Data:', encryptedData);
  
  const validationContract = new ethers.Contract(CONTRACT_VALIDATION_ADDRESS, ABI, signer);
  const maxPriorityFeePerGas = ethers.utils.parseUnits('10', 'gwei');
  // const options = {
  //   gasLimit: 25000, // Adjust this value as needed
  // };

  const response = await validationContract.addProductEncryptedData(truklipid, encryptedData,options);
  console.log(response)

  
  // Decrypt the encrypted data back to a JSON string
 
  const encryptedDataFromBlockchain = await validationContract.getProductEncrytedData(truklipid).call();
  const bytes = CryptoJS.AES.decrypt(encryptedDataFromBlockchain, secretKey);
  const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
  
  console.log('Decrypted Data:', decryptedData);
  
  // Parse the JSON string back to a JSON object
  const decryptedJsonData = JSON.parse(decryptedData);
  
  console.log('Decrypted JSON:', decryptedJsonData);
  
  res.status(200).json({
    success: true,
    valid: result, 
    dataretrived: decryptedJsonData
  });
  
})
