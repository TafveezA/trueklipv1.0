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