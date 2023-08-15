
const asyncHandler = require('../middleware/async')


const{Web3}=require("web3")
const ABI= require("../config/validationABI.json")
const ALCHEMY_RPC_URL_SEPOLIA="https://eth-sepolia.g.alchemy.com/v2/FOxH7918EsvBRVwTUVGk5gzhgE2UFoxJ"
const CONTRACT_VALIDATION_ADDRESS="0xdeFd0014ead1D3aC3f172c27fb59c13609a8cED8"
const web3 =new Web3(ALCHEMY_RPC_URL_SEPOLIA)
const contract = new web3.eth.Contract(ABI,CONTRACT_VALIDATION_ADDRESS)


//EOS Blockchain API Credentials

const privateKey = process.env.PRIVATE_KEY;
    const EOS_RPC_URL='https://api.testnet.evm.eosnetwork.com/';
    const EOS_PROVIDER = new Web3(EOS_RPC_URL)

    const account = web3.eth.accounts.privateKeyToAccount(privateKey)
    const eoscontractAddress = "0x192d2fC734D58fc2864A8E6F33a00361943DefBB" 
    const supplyChainContract = new ethers.Contract(eoscontractAddress, abiSupplyChain, wallet);





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









