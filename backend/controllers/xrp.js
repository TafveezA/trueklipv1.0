const asyncHandler = require('../middleware/async')
const ErrorResponse = require('../utils/errorResponse')
const dotenv = require('dotenv')
dotenv.config({path:'../config/config.env'})
const {Client,Wallet} = require('xrpl')
const {getWalletDetails} = require('../utils/walletdetails')

const client = new Client(process.env.CLIENT);





// @desc  get  validation of product
// @route Get /api/eth/v1/validate
// @access Public
exports.connectToXRPL = asyncHandler(async(req,res,next)=>{
    await client.connect()

    // ... custom code goes here
    
    // Disconnect when done (If you omit this, Node.js won't end the process)
  
                  
     res.status(200).json({
      success:true,
      valid:"Connected to the XRPL Ledger"
     })
     client.disconnect()
    
})