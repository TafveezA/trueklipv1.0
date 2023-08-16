
const asyncHandler = require('../middleware/async')
const dotenv = require('dotenv')

dotenv.config({path:'../config/config.env'})


//get account from the wallet

const privateKey = process.env.PRIVATE_KEY; 






const{Web3}=require("web3")
const ABI= require("../config/validationABI.json")
const ALCHEMY_RPC_URL_SEPOLIA=process.env.ALCHEMY_RPC_URL_SEPOLIA
const CONTRACT_VALIDATION_ADDRESS=process.env.CONTRACT_VALIDATION_ADDRESS
const web3 =new Web3(ALCHEMY_RPC_URL_SEPOLIA)
const contract = new web3.eth.Contract(ABI,CONTRACT_VALIDATION_ADDRESS)


//EOS Blockchain part 
console.log( "Private Key",process.env.PRIVATE_KEY)
console.log("EOS rpc url",process.env.EOS_RPC_URL)
console.log("Supply chain smart contract on EOS",process.env.EOS_SUPPLYCHAIN_CONTRACT_ADDRESS)


const EOS_RPC_URL=process.env.EOS_RPC_URL;
const EOS_PROVIDER = new Web3(EOS_RPC_URL)
const abiSupplyChain =ABI
const eoscontractAddress = process.env.EOS_SUPPLYCHAIN_CONTRACT_ADDRESS


console.log(privateKey.toUpperCase())
const eosSupplyChainContract = new EOS_PROVIDER.eth.Contract(abiSupplyChain,eoscontractAddress);





// @desc  get  validation of product
// @route Get /api/ethv1/validate
// @access Public
exports.validateProduct = asyncHandler(async(req,res,next)=>{
            const {id}= req.params
            console.log(id)
      
            
            const result = await contract.methods.validate(id).call();
      
            console.log("Valid",result)
                          
             res.status(200).json({
              truklipId:id,
              success:true,
              valid:result,
             })
            
})

exports.validateProductOnEOS = asyncHandler(async(req,res,next)=>{
    const {id} = req.params
    const result = await eosSupplyChainContract.methods.validate(id).call()
    console.log(result)
    res.status(200).json({
        truklipId:id,
        success:true,
        valid:result,

    })
})








