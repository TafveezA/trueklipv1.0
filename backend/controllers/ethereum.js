const asyncHandler = require('../middleware/async')
const ErrorResponse = require('../utils/errorResponse')
const dotenv = require('dotenv')

dotenv.config({path:'../config/config.env'})
const CryptoJS = require('crypto-js');
//const {ethers} = require('ethers')
const { BigNumber } = require('bignumber.js');

const{Web3}=require("web3")
const ABI= require("../config/validationABI.json")


const Product = require('../models/productModel.js')
const ALCHEMY_RPC_URL_SEPOLIA=process.env.ALCHEMY_RPC_URL_SEPOLIA
const PRIVATE_KEY=process.env.PRIVATE_KEY;
const CONTRACT_VALIDATION_ADDRESS=process.env.CONTRACT_ADDRESS_VALIDATION


console.log(ALCHEMY_RPC_URL_SEPOLIA)
INFURA_RPC_PROVIDER='https://sepolia.infura.io/v3/12d8279bb5a04bbabc47862d11820722'
//const alchemyProvider = new JsonRpcProvider(ALCHEMY_RPC_URL_SEPOLIA)

//let walletSigner = signer.connect(window.ethersProvider)

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

// exports.addProductDetails = asyncHandler(async(req,res,next)=>{
//   const jsonData = req.body;
//   console.log(jsonData)
//   const truklipid = jsonData._truKlipId;
//   console.log("truklipid",truklipid)
//   const jsonString = JSON.stringify(jsonData);
//   const secretKey = "mySecretKey12345";
//   const encryptedData = CryptoJS.AES.encrypt(jsonString, secretKey).toString();
  
//   console.log('Encrypted Data:', encryptedData);

//   const signer = alchemyProvider.getSigner()

  
//   const validationContract = new ethers.Contract(CONTRACT_VALIDATION_ADDRESS, ABI, signer);
//   const txns = await validationContract.addProduct('a')
//   await txns.wait()






  

  
//   // const encryptedDataFromBlockchain = await validationContract.getProductEncryptedData(truklipid);
//   const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
//   const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
  
//   console.log('Decrypted Data:', decryptedData);
  
//   const decryptedJsonData = JSON.parse(decryptedData);
  
//   console.log('Decrypted JSON:', decryptedJsonData);
  
//   res.status(200).json({
//     success: true
//   });
  
// })


exports.addProductDetail = asyncHandler(async (req, res, next) => {
  // Ensure you have properly initialized your contract and web3
  // e.g., const web3 = new Web3(YOUR_PROVIDER);
  //       const contract = new web3.eth.Contract(ABI, CONTRACT_VALIDATION_ADDRESS);

  // Estimate the gas for the transaction
  const estimatedGas = await contract.methods.addProduct('b').estimateGas({ 
    from: "0x18b6ec96DD823953926ae067b877FdCc572F64EE" 
  });

  console.log(`Estimated Gas: ${estimatedGas}`);




  const data = await contract.methods.addProduct('b').encodeABI();


  const tx = {
    from: "0x18b6ec96DD823953926ae067b877FdCc572F64EE",
    to: CONTRACT_VALIDATION_ADDRESS,
    gas: 1000000,  // Use the buffered gas estimate
    maxPriorityFeePerGas: web3.utils.toHex(web3.utils.toWei('2', 'gwei')), 
    maxFeePerGas: web3.utils.toHex(web3.utils.toWei('150', 'gwei')),
    data: data
  };


  const signPromise = await web3.eth.accounts.signTransaction(tx, PRIVATE_KEY);


  const sendTxn = await web3.eth.sendSignedTransaction(signPromise.rawTransaction);
  await sendTxn.wait()

  res.status(200).json({
     success: true,
     transaction: sendTxn
  });
});
