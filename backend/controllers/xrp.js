const asyncHandler = require('../middleware/async')
const ErrorResponse = require('../utils/errorResponse')
const dotenv = require('dotenv')
dotenv.config({path:'../config/config.env'})
const {Client,Wallet} = require('xrpl')
const xrpl = require('xrpl')
const {getWalletDetails} = require('../utils/walletdetails')
const {getNet} = require('../utils/getNet')
const { response } = require('../server')


const client = new Client(process.env.CLIENT);
console.log(process.env.CLIENT)

const cold_wallet = Wallet.fromSeed(process.env.COLD_SECRET);
console.log(cold_wallet)

const hot_wallet = Wallet.fromSeed(process.env.HOT_SECRET);
console.log(hot_wallet)





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



//steps to generate fungible token
//1>configure hot wallet
//2>configure cold wallet
//3>
exports.configColdAddress = asyncHandler(async(req,res,next)=>{
    await client.connect()
// Configure issuer (cold address) settings ----------------------------------
const cold_settings_tx = {
    "TransactionType": "AccountSet",
    "Account": cold_wallet.address,
    "TransferRate": 0,
    "TickSize": 5,
    "Domain": "6578616D706C652E636F6D", // "example.com"
    "SetFlag": xrpl.AccountSetAsfFlags.asfDefaultRipple,
    // Using tf flags, we can enable more flags in one transaction
     "Flags": (xrpl.AccountSetTfFlags.tfDisallowXRP |
             xrpl.AccountSetTfFlags.tfRequireDestTag)
  }

  const cst_prepared = await client.autofill(cold_settings_tx)
  const cst_signed = cold_wallet.sign(cst_prepared)
  console.log("Sending cold address AccountSet transaction...")
  const cst_result = await client.submitAndWait(cst_signed.tx_blob)

  if (cst_result.result.meta.TransactionResult == "tesSUCCESS") {
    console.log(`Transaction succeeded: https://testnet.xrpl.org/transactions/${cst_signed.hash}`)
    res.json({validationsuccess:cst_result.result.meta.TransactionResult,
    txnURL_ColdWallet:`https://testnet.xrpl.org/transactions/${cst_signed.hash}`})
    
  } else {
 
    console.log(cst_result)
    next(new ErrorResponse(`Error while issuing the token`,500))
  }
  client.disconnect()

  
})


exports.configHotAddress = asyncHandler(async(req,res,next)=>{
// Configure hot address settings --------------------------------------------
await client.connect()
const hot_settings_tx = {
    "TransactionType": "AccountSet",
    "Account": hot_wallet.address,
    "Domain": "6578616D706C652E636F6D", // "example.com"
    // enable Require Auth so we can't use trust lines that users
    // make to the hot address, even by accident:
    "SetFlag": xrpl.AccountSetAsfFlags.asfRequireAuth,
    "Flags": (xrpl.AccountSetTfFlags.tfDisallowXRP |
              xrpl.AccountSetTfFlags.tfRequireDestTag)
  }

  const hst_prepared = await client.autofill(hot_settings_tx)
  const hst_signed = hot_wallet.sign(hst_prepared)
  console.log("Sending hot address AccountSet transaction...")
  const hst_result = await client.submitAndWait(hst_signed.tx_blob)
  client.disconnect()
  if (hst_result.result.meta.TransactionResult == "tesSUCCESS") {
    console.log(`Transaction succeeded: https://testnet.xrpl.org/transactions/${hst_signed.hash}`)
    res.json({validationsuccess:hst_result.result.meta.TransactionResult,
        txnURL_HotWallet:`https://testnet.xrpl.org/transactions/${hst_signed.hash}`})

  } else {
    console.log(cst_result)
    next(new ErrorResponse(`Error while issuing the token`,500))
  }


  
})

exports.createTrustLine = asyncHandler(async(req,res,next)=>{
await client.connect()
// Create trust line from hot to cold address --------------------------------
const currency_code = "AED"
const trust_set_tx = {
  "TransactionType": "TrustSet",
  "Account": hot_wallet.address,
  "LimitAmount": {
    "currency": currency_code,
    "issuer": cold_wallet.address,
    "value": "10000000000" // Large limit, arbitrarily chosen
  }
}

const ts_prepared = await client.autofill(trust_set_tx)
const ts_signed = hot_wallet.sign(ts_prepared)
console.log("Creating trust line from hot address to issuer...")
const ts_result = await client.submitAndWait(ts_signed.tx_blob)
if (ts_result.result.meta.TransactionResult == "tesSUCCESS") {
  console.log(`Transaction succeeded: https://testnet.xrpl.org/transactions/${ts_signed.hash}`)
  res.json({validationsuccess:ts_result.result.meta.TransactionResult,
    txnURL:`https://testnet.xrpl.org/transactions/${ts_signed.hash}`})

} else {
  throw `Error sending transaction: ${ts_result.result.meta.TransactionResult}`
}

client.disconnect()

})


exports.sendToken = asyncHandler(async(req,res,next)=>{
    await client.connect()
 // Send token ----------------------------------------------------------------
 const issue_quantity = "3840"
 const currency_code="AED"
 const send_token_tx = {
   "TransactionType": "Payment",
   "Account": cold_wallet.address,
   "Amount": {
     "currency": currency_code,
     "value": issue_quantity,
     "issuer": cold_wallet.address
   },
   "Destination": hot_wallet.address,
   "DestinationTag": 1 // Needed since we enabled Require Destination Tags
                       // on the hot account earlier.
 }

 const pay_prepared = await client.autofill(send_token_tx)
 const pay_signed = cold_wallet.sign(pay_prepared)
 console.log(`Sending ${issue_quantity} ${currency_code} to ${hot_wallet.address}...`)
 const pay_result = await client.submitAndWait(pay_signed.tx_blob)
 if (pay_result.result.meta.TransactionResult == "tesSUCCESS") {
   console.log(`Transaction succeeded: https://testnet.xrpl.org/transactions/${pay_signed.hash}`)
   res.json({success:pay_result.result.meta.TransactionResult,
                message:`Transaction succeeded: https://testnet.xrpl.org/transactions/${pay_signed.hash}`})
 } else {
   throw `Error sending transaction: ${pay_result.result.meta.TransactionResult}`
 }
    
    client.disconnect()
    
    })
    

