
const asyncHandler = require('../middleware/async')
const ErrorResponse = require('../utils/errorResponse')
const dotenv = require('dotenv')

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








