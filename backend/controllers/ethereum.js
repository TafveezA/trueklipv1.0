const asyncHandler = require('../middleware/async')
const ErrorResponse = require('../utils/errorResponse')
const dotenv = require('dotenv')

dotenv.config({path:'../config/config.env'})
const ethers = require('ethers')
const { BigNumber } = require('bignumber.js');
const CryptoJS = require('crypto-js');
const ABI= require("../config/validationABI.json")
const NFT_ABI = require("../config/nftCertificateABI.json")



const ALCHEMY_RPC_URL_SEPOLIA=process.env.ALCHEMY_RPC_URL_SEPOLIA
const PRIVATE_KEY=process.env.PRIVATE_KEY;
const CONTRACT_VALIDATION_ADDRESS=process.env.CONTRACT_ADDRESS_VALIDATION

const provider = new ethers.providers.JsonRpcProvider(ALCHEMY_RPC_URL_SEPOLIA);
const signer = new ethers.Wallet(PRIVATE_KEY, provider);
const contractInstance = new ethers.Contract(CONTRACT_VALIDATION_ADDRESS, ABI, signer);
const nftContractInstance  = new ethers.Contract("0x6e5f09ff3817af68BfAd093f21Ce7f912b7F1839",NFT_ABI,signer)
console.log(ALCHEMY_RPC_URL_SEPOLIA)
// INFURA_RPC_PROVIDER='https://sepolia.infura.io/v3/12d8279bb5a04bbabc47862d11820722'








//testing api for add product to blockchain
exports.addProductDetail = asyncHandler(async (req, res, next) => {
  const tx = await contractInstance.addProduct('b');
  await tx.wait();

  res.status(200).json({
     success: true,
     transaction: tx
  });
});








// @desc  get  validation of product
// @route Get /api/eth/v1/validate
// @access Public
exports.validateProduct = asyncHandler(async(req,res,next)=>{
  const {truklipid}= req.body
  console.log(truklipid)
  const result = await contractInstance.validationResult(truklipid).call();

  console.log("Valid",result)
                
   res.status(200).json({
    truklipId:truklipid,
    success:true,
    valid:result
   })
  
})





//this API is for encrypting the data and stroring to the ethereum blockchain
exports.addProductDetails = asyncHandler(async(req,res,next)=>{
  const jsonData = req.body;
  console.log(jsonData)
  const truklipid = jsonData._truKlipId;
  console.log("truklipid",truklipid)
  const jsonString = JSON.stringify(jsonData);
  const secretKey =process.env.AES_ENCRYPTION_SECRET_KEY;
  const encryptedData = CryptoJS.AES.encrypt(jsonString, secretKey).toString();
  
  console.log('Encrypted Data:', encryptedData);

  const txns = await contractInstance.addProductEncryptedData(truklipid,encryptedData)
  await txns.wait()
  const encryptedDataFromBlockchain = await contractInstance.getProductEncryptedData(truklipid);
  const bytes = CryptoJS.AES.decrypt(encryptedDataFromBlockchain, secretKey);
  const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
  
  console.log('Decrypted Data:', decryptedData);
  console.log('Decrypted data from blockchain',decryptedData)
  console.log('Encrypted data from the blockchain',encryptedDataFromBlockchain)
  const decryptedJsonData = JSON.parse(decryptedData);
  console.log('Decrypted JSON:', decryptedJsonData);
  
  res.status(200).json({
    success: true,
    data:decryptedJsonData
  });
  
})


//nft will be minted at pos during purchase 
exports.mintNFT = asyncHandler(async(req,res,next)=>{
  const {address,tokenId,truklipid} = req.body;
  console.log(address,tokenId,truklipid)
  const result = await nftContractInstance.safeMint("https://ipfs.truklip.com",signer.getAddress());
  await result.wait()
  res.status(200).json({
    trueklipid:truklipid,
    success:true,
    result:result
  })
})

// trkuklip certificate tranfer
//mostly this will be from the frontend
exports.transferCertificate = asyncHandler(async(req,res,next)=>{
  const {toaddress,tokenid,truklipid} = req.body;
  console.log(toaddress,tokenid,truklipid)
  const approve = await nftContractInstance.approve("0x78586e9017cda27E062A21F1589aFda018D7674F",tokenid)
  await approve.wait()
  const result = await nftContractInstance.transferFrom(signer.getAddress(),"0x78586e9017cda27E062A21F1589aFda018D7674F",tokenid)
  await result.wait()
 res.status(200).json({
  truklipid:truklipid,
  toaddress:toaddress,
  result:result
 })

  

})