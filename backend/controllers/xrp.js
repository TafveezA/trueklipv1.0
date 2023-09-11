const asyncHandler = require('../middleware/async')
const ErrorResponse = require('../utils/errorResponse')
const dotenv = require('dotenv')
dotenv.config({path:'../config/config.env'})
const {Client,Wallet,xrpToDrops} = require('xrpl')
const xrpl = require('xrpl')
const {getWalletDetails} = require('../utils/walletdetails')
const {getNet} = require('../utils/getNet')
const { response } = require('../server')
const { BigNumber } = require('bignumber.js');

// ...

// Example usage:
const value1 = new BigNumber('123.456789');
const value2 = new BigNumber('987.654321');

const sum = value1.plus(value2);
console.log(sum.toString()); // Output: 1111.11111



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
//3>create a trust line(make sure currency symbol should match)
//4> send a token
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
const currency_code = "USD"
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
 const currency_code="USD"
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
exports.confirmBalance = asyncHandler(async(req,res,next)=>{
      await client.connect() // Check balances ------------------------------------------------------------
    console.log("Getting hot address balances...")
    const hot_balances = await client.request({
    command: "account_lines",
    account: hot_wallet.address,
    ledger_index: "validated"
    })
    console.log(hot_balances.result)
    
    console.log("Getting cold address balances...")
    const cold_balances = await client.request({
    command: "gateway_balances",
    account: cold_wallet.address,
    ledger_index: "validated",
    hotwallet: [hot_wallet.address]
    })
    console.log(JSON.stringify(cold_balances.result, null, 2))
    res.json({cold_balances,hot_balances})
    client.disconnect()
    })



exports.issueToken =asyncHandler(async(req,res,next)=>{

  await client.connect()
  const hot_wallet = new Wallet(process.env.HOT_SECRET)
  const cold_wallet = new Wallet(process.env.COLD_SECRET)


  console.log(`Got hot address ${hot_wallet.address} and cold address ${cold_wallet.address}.`)

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
  } else {
    next( new ErrorResponse(`Error sending transaction: ${cst_result}`,500))
  }


  // Configure hot address settings --------------------------------------------

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
  if (hst_result.result.meta.TransactionResult == "tesSUCCESS") {
    console.log(`Transaction succeeded: https://testnet.xrpl.org/transactions/${hst_signed.hash}`)
  } else {
    next( new ErrorResponse( `Error sending transaction: ${hst_result.result.meta.TransactionResult}`))
  }


  // Create trust line from hot to cold address --------------------------------
  const currency_code = "USD"
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
  } else {
    next( new ErrorResponse(`Error sending transaction: ${ts_result.result.meta.TransactionResult}`))
  }


  // Send token ----------------------------------------------------------------
  const issue_quantity = "4000"
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
  } else {
    next(new ErrorResponse( `Error sending transaction: ${pay_result.result.meta.TransactionResult}`))
  }

  // Check balances ------------------------------------------------------------
  console.log("Getting hot address balances...")
  const hot_balances = await client.request({
    command: "account_lines",
    account: hot_wallet.address,
    ledger_index: "validated"
  })
  console.log(hot_balances.result)

  console.log("Getting cold address balances...")
  const cold_balances = await client.request({
    command: "gateway_balances",
    account: cold_wallet.address,
    ledger_index: "validated",
    hotwallet: [hot_wallet.address]
  })
  const result = {
    hot_balances:cold_balances,
    cold_balances:hot_balances,
    payresult:`Transaction succeeded: https://testnet.xrpl.org/transactions/${pay_signed.hash}`,
    tsresult:`Transaction succeeded: https://testnet.xrpl.org/transactions/${ts_signed.hash}`,
    hst_result:`Transaction succeeded: https://testnet.xrpl.org/transactions/${hst_signed.hash}`,
    cst_result:`Transaction succeeded: https://testnet.xrpl.org/transactions/${cst_signed.hash}`,

  }
  res.json(result)
})
// trade of products on dex way by creating orderbooks
exports.tradeProduct = asyncHandler(async(req,res,next)=>{
// Check balances ------------------------------------------------------------

  await client.connect() 
  const walletIssuer = xrpl.Wallet.fromSeed(process.env.HOT_SECRET)
  console.log("Issuer Wallet",walletIssuer)
  const wallet = Wallet.fromSeed(process.env.COLD_SECRET)
  console.log("Wallet Taker Address @Product view",wallet)
  // Define the proposed trade. ------------------------------------------------
  // Technically you don't need to specify the amounts (in the "value" field)
  // to look up order books using book_offers, but for this tutorial we reuse
  // these variables to construct the actual Offer later.
  const we_want = {
    currency: "AED",
    issuer: walletIssuer.address,
    value: "25"
  }
  const we_spend = {
    currency: "XRP",
           // 25 AED * 10 XRP per AED * 15% financial exchange (FX) cost
    value: xrpl.xrpToDrops(25*10*1.15)
  }
  // "Quality" is defined as TakerPays / TakerGets. The lower the "quality"
  // number, the better the proposed exchange rate is for the taker.
  // The quality is rounded to a number of significant digits based on the
  // issuer's TickSize value (or the lesser of the two for token-token trades.)
  const proposed_quality = BigNumber(we_spend.value) / BigNumber(we_want.value)

  // Look up Offers. -----------------------------------------------------------
  // To buy AED, look up Offers where "TakerGets" is AED:
  const orderbook_resp = await client.request({
    "command": "book_offers",
    "taker": wallet.address,
    "ledger_index": "current",
    "taker_gets": we_want,
    "taker_pays": we_spend
  })
  console.log(JSON.stringify(orderbook_resp.result, null, 2))

  // Estimate whether a proposed Offer would execute immediately, and...
  // If so, how much of it? (Partial execution is possible)
  // If not, how much liquidity is above it? (How deep in the order book would
  //    other Offers have to go before ours would get taken?)
  // Note: These estimates can be thrown off by rounding if the token issuer
  // uses a TickSize setting other than the default (15). In that case, you
  // can increase the TakerGets amount of your final Offer to compensate.

  const offers = orderbook_resp.result.offers
  const want_amt = BigNumber(we_want.value)
  let running_total = BigNumber(0)
  if (!offers) {
    console.log(`No Offers in the matching book.
                 Offer probably won't execute immediately.`)
  } else {
    for (const o of offers) {
      if (o.quality <= proposed_quality) {
        console.log(`Matching Offer found, funded with ${o.owner_funds}
            ${we_want.currency}`)
        running_total = running_total.plus(BigNumber(o.owner_funds))
        if (running_total >= want_amt) {
          console.log("Full Offer will probably fill")
          break
        }
      } else {
        // Offers are in ascending quality order, so no others after this
        // will match, either
        console.log(`Remaining orders too expensive.`)
        break
      }
    }
    console.log(`Total matched:
          ${Math.min(running_total, want_amt)} ${we_want.currency}`)
    if (running_total > 0 && running_total < want_amt) {
      console.log(`Remaining ${want_amt - running_total} ${we_want.currency}
            would probably be placed on top of the order book.`)
    }
  }

  if (running_total == 0) {
    // If part of the Offer was expected to cross, then the rest would be placed
    // at the top of the order book. If none did, then there might be other
    // Offers going the same direction as ours already on the books with an
    // equal or better rate. This code counts how much liquidity is likely to be
    // above ours.

    // Unlike above, this time we check for Offers going the same direction as
    // ours, so TakerGets and TakerPays are reversed from the previous
    // book_offers request.
    const orderbook2_resp = await client.request({
      "command": "book_offers",
      "taker": wallet.address,
      "ledger_index": "current",
      "taker_gets": we_spend,
      "taker_pays": we_want
    })
    console.log(JSON.stringify(orderbook2_resp.result, null, 2))

    // Since TakerGets/TakerPays are reversed, the quality is the inverse.
    // You could also calculate this as 1/proposed_quality.
    const offered_quality = BigNumber(we_want.value) / BigNumber(we_spend.value)

    const offers2 = orderbook2_resp.result.offers
    let tally_currency = we_spend.currency
    if (tally_currency == "XRP") { tally_currency = "drops of XRP" }
    let running_total2 = 0
    if (!offers2) {
      console.log(`No similar Offers in the book. Ours would be the first.`)
    } else {
      for (const o of offers2) {
        if (o.quality <= offered_quality) {
          console.log(`Existing offer found, funded with
                ${o.owner_funds} ${tally_currency}`)
          running_total2 = running_total2.plus(BigNumber(o.owner_funds))
        } else {
          console.log(`Remaining orders are below where ours would be placed.`)
          break
        }
      }
      console.log(`Our Offer would be placed below at least
            ${running_total2} ${tally_currency}`)
      if (running_total > 0 && running_total < want_amt) {
        console.log(`Remaining ${want_amt - running_total} ${tally_currency}
              will probably be placed on top of the order book.`)
      }
    }
  }
  res.json({message:"lookup successfull"})


  client.disconnect()
})
        
    




//send offercreate transaction
exports.placeOffer = asyncHandler(async(req,res,next)=>{
  await client.connect()
  // Send OfferCreate transaction ----------------------------------------------
  const we_want = {
    currency: "AED",
    issuer: cold_wallet.address,
    value: "25"
  }
  const we_spend = {
    currency: "XRP",
           // 25 AED * 10 XRP per AED * 15% financial exchange (FX) cost
    value:xrpToDrops(25*10*1.15)
  }
  // For this tutorial, we already know that TST is pegged to
  // XRP at a rate of approximately 10:1 plus spread, so we use
  // hard-coded TakerGets and TakerPays amounts.
console.log()
  const offer_1 = {
    "TransactionType": "OfferCreate",
    "Account": hot_wallet.address,
    "TakerPays": we_want,
    "TakerGets": we_spend// since it's XRP
  }

  const prepared = await client.autofill(offer_1)
  console.log("Prepared transaction:", JSON.stringify(prepared, null, 2))
  const signed = hot_wallet.sign(prepared)
  console.log("Sending OfferCreate transaction...")
  const result = await client.submitAndWait(signed.tx_blob)
  if (result.result.meta.TransactionResult == "tesSUCCESS") {
    console.log(`Transaction succeeded:
          https://testnet.xrpl.org/transactions/${signed.hash}`)
          
res.json({success:true,url:`Transaction succeeded:
https://testnet.xrpl.org/transactions/${signed.hash}`})
  } else {
    throw `Error sending transaction: ${result}`
  }

client.disconnect()
})
// error in the above fixes are require.


// mint product NFT on XRPL

exports.mintCertificate = asyncHandler(async (req, res, next) => {
   

      const { tokenUrl, flags, transferFee } = req.body;
  
      // Converts input values to the correct data types if necessary
      const convertedFlags = parseInt(flags);
      const convertedTransferFee = parseInt(transferFee);
  
  
     
      await client.connect();
      const standby_wallet = xrpl.Wallet.fromSeed(process.env.COLD_SECRET);
      const transactionBlob = {
        TransactionType: "NFTokenMint",
        Account: standby_wallet.address,
        URI: xrpl.convertStringToHex(tokenUrl),
        Flags: convertedFlags,
        TransferFee: convertedTransferFee,
        NFTokenTaxon: 0, // Required, but set to zero if not needed
    
      };
  
      // Submit the signed blob
      const tx = await client.submitAndWait(transactionBlob, {
        wallet: standby_wallet
      });
  

      const nfts = await client.request({
        method: "account_nfts",
        account: standby_wallet.address
      });

      res.json({
        success: "Minted NFT successfully",
        transactionId: tx.result.meta.TransactionResult,
        nfts: nfts,
      });

      client.disconnect();
     


  });
  




// get product NFT on XRPL

exports.getNFTCertificate = asyncHandler(async (req, res, next) => {
  try {
   
    await client.connect();
    const standby_wallet = Wallet.fromSeed(process.env.HOT_SECRET);
    const nfts = await client.request({
      method: "account_nfts",
      account: standby_wallet.classicAddress,
    });
    res.json(nfts);
  } catch (error) {
    next(new ErrorResponse(`Error: ${error}`, 500));
  } finally {
    client.disconnect();
  }
});


exports.burnNFTCertificate = asyncHandler(async(req,res,next)=>{
  const standby_wallet = Wallet.fromSeed(process.env.COLD_SECRET)
  const { nfttokenid } = req.body;
  await client.connect()
    // ------------------------------------------------------- Prepare transaction
    const transactionBlob = {
      TransactionType: "NFTokenBurn",
      Account: standby_wallet.classicAddress,
      NFTokenID: nfttokenid
    };
  
    //---------------------------------- Submit transaction and wait for the results
    const tx = await client.submitAndWait(transactionBlob, {
      wallet: standby_wallet
    });
    const nfts = await client.request({
      method: "account_nfts",
      account: standby_wallet.classicAddress
    });
  res.json({success:true,nfts})
    //------------------------------------------------------- Report results
  
  
  client.disconnect()


})


exports.createNFTSellOffer = asyncHandler(async (req, res, next) => {
 

  const { nfttokenid, amount, flags } = req.body;
  await client.connect();
  const standby_wallet = Wallet.fromSeed(process.env.HOT_SECRET);
  const operational_wallet = Wallet.fromSeed(process.env.COLD_SECRET);
  console.log(operational_wallet.classicAddress)
  // Prepare transaction -------------------------------------------------------
  const transactionBlob = {
    "TransactionType": "NFTokenCreateOffer",
    "Account": operational_wallet.classicAddress,
    "Owner":standby_wallet.address,
    "NFTokenID": nfttokenid,
    "Amount": amount,
    "Flags": null,
  };

  // Submit transaction --------------------------------------------------------
  const txn_prepared = await client.autofill(transactionBlob)
  const txn_signed = standby_wallet.sign(txn_prepared)
  const tx = await client.submitAndWait(txn_signed.tx_blob);

  let nftSellOffers;
  try {
    nftSellOffers = await client.request({
      method: "nft_sell_offers",
      nft_id: nfttokenid,
    });
  } catch (error) {
    nftSellOffers = "No sell offers.";
    next(new ErrorResponse(`Error While looking nft sell offers: ${error}`, 500));
    return; // Return early to avoid further execution
  }

  let nftBuyOffers;
  try {
    nftBuyOffers = await client.request({
      method: "nft_buy_offers",
      nft_id: nfttokenid,
    });
  } catch (error) {
    nftBuyOffers = "No buy offers.";
    next(new ErrorResponse(`No buy offers: ${error}`, 500));
    return; // Return early to avoid further execution
  }

  // Check transaction results -------------------------------------------------
  let results = '\n\nTransaction result:\n' +
    JSON.stringify(tx.result.meta.TransactionResult, null, 2);
  results += '\n\nBalance changes:\n' +
    JSON.stringify(xrpl.getBalanceChanges(tx.result.meta), null, 2);
  console.log(results);

  const response = {
    standby_wallet_balance: await client.getXrpBalance(operational_wallet.address),
    operational_wallet_balance: await client.getXrpBalance(standby_wallet.address),
    nftBuyOffers: nftBuyOffers,
    nftSellOffers: nftSellOffers,
    txnResult: tx.result.meta.TransactionResult,
  };

  res.json(response);

  client.disconnect();
});


exports.createNFTBuyOffer = asyncHandler(async(req,res,next)=>{
  const standby_wallet = Wallet.fromSeed(process.env.HOT_SECRET)
  const operational_wallet = Wallet.fromSeed(process.env.COLD_SECRET)
  const client = new Client(process.env.CLIENT)
  const { nfttokenid,amount,flags,owner } = req.body;
    // Prepare transaction -------------------------------------------------------
    const transactionBlob = {
      "TransactionType": "NFTokenCreateOffer",
      "Account": operational_wallet.classicAddress,
      "Owner": owner,
      "NFTokenID":nfttokenid,
      "Amount": amount,
      "Flags":flags,
    }
  // Submit transaction --------------------------------------------------------
  const tx = await client.submitAndWait(transactionBlob,{wallet: operational_wallet})

  results += "\n\n***Sell Offers***\n"
  let nftSellOffers
  try {
    nftSellOffers = await client.request({
      method: "nft_sell_offers",
      nft_id: operationalTokenIdField.value  
    })
  } catch (err) {
    nftSellOffers = "No sell offers."
  }
  results += JSON.stringify(nftSellOffers,null,2)
  results += "\n\n***Buy Offers***\n"
  let nftBuyOffers
  try {
    nftBuyOffers = await client.request({
      method: "nft_buy_offers",
      nft_id: operationalTokenIdField.value
    })
  } catch (err) {
    results += "No buy offers."
  }
  results += JSON.stringify(nftBuyOffers,null,2)

  // Check transaction results -------------------------------------------------
  results += "\n\nTransaction result:\n" +
    JSON.stringify(tx.result.meta.TransactionResult, null, 2)
  results += "\n\nBalance changes:\n" + 
    JSON.stringify(xrpl.getBalanceChanges(tx.result.meta), null, 2)
  operationalResultField.value = results
  const results = {
    standby_wallet_balance:await client.getXrpBalance(operational_wallet.address),
    operational_wallet_balance:await client.getXrpBalance(standby_wallet.address),
    nftBuyOffers:nftBuyOffers,
    nftSellOffers:nftSellOffers,
    txnResult:tx.result.meta.TransactionResult,
  }

  res.json(results)
  

  
  
  client.disconnect()


})


exports.cancleOffer = asyncHandler(async(req,res,next)=>{




  await client.connect()
  const wallet = xrpl.Wallet.fromSeed(process.env.HOT_SECRET)
  const {nfttokenid,tokenofferIds} = req.body

  // Prepare transaction -------------------------------------------------------
  const transactionBlob = {
    "TransactionType": "NFTokenCancelOffer",
    "Account": wallet.classicAddress,
    "NFTokenOffers": tokenofferIds
  }
  // Submit transaction --------------------------------------------------------
  const tx = await client.submitAndWait(transactionBlob,{wallet})

 
  let nftSellOffers
  try {
    nftSellOffers = await client.request({
      method: "nft_sell_offers",
      nft_id: nfttokenid
    })
  } catch (err) {
    nftSellOffers = "No sell offers."
  }
  results += JSON.stringify(nftSellOffers,null,2)
  results += "\n\n***Buy Offers***\n"
  let nftBuyOffers
  try {
    nftBuyOffers = await client.request({
      method: "nft_buy_offers",
      nft_id: nfttokenid
    })
  } catch (err) {
    nftBuyOffers = "No buy offers."
  }
  results += JSON.stringify(nftBuyOffers,null,2)


const response = {
  txnresult:tx.meta.TransactionResult,
  banlancechanges: xrpl.getBalanceChanges(tx.result.meta),
  nftbuyoffers:nftBuyOffers,
  nftselloffers:nftSellOffers

}
res.json(response)

  client.disconnect()
})// End of cancelOffer()

// *******************************************************
// **************** Operational Get Offers ***************
// *******************************************************

exports.getOffers = asyncHandler(async(req,res,next)=>{


  const {nfttokenid} = req.body

  await client.connect()
  // const standby_wallet = xrpl.Wallet.fromSeed(process.env.HOT_SECRET)

  let nftSellOffers
  try {
    nftSellOffers = await client.request({
      method: "nft_sell_offers",
      nft_id: nfttokenid
    })
  } catch (err) {
    nftSellOffers = 'No sell offers.'
  }

  let nftBuyOffers
  try {
    nftBuyOffers = await client.request({
      method: "nft_buy_offers",
      nft_id: nfttokenid
    })
  } catch (err) {
    nftBuyOffers =  'No buy offers.'
  }

  const result = [{
    nftBuyOffers:nftBuyOffers,
    nftSellOffers:nftSellOffers,
  }]
  res.json(result)

  client.disconnect()
})


// End of getOffers()

// @desc  accept Buy Offer
// @route POST /api/v1/xrp/acceptselloffer
exports.acceptSellOffer = asyncHandler(async(req,res,next)=>{
  

  
  const {nfttokenselloffer} = req.body

  await client.connect()
  const standby_wallet = xrpl.Wallet.fromSeed(process.env.COLD_SECRET)
  const operational_wallet = xrpl.Wallet.fromSeed(process.env.HOT_SECRET)

  // Prepare transaction -------------------------------------------------------
  const transactionBlob = {
    "TransactionType": "NFTokenAcceptOffer",
    "Account": operational_wallet.classicAddress,
    "NFTokenSellOffer": operationalTokenOfferIndexField.value,
  }
  // Submit transaction --------------------------------------------------------
  const tx = await client.submitAndWait(transactionBlob,{wallet: operational_wallet}) 
  const nfts = await client.request({
    method: "account_nfts",
    account: nfttokenselloffer
  })
  const response = {txnresult:tx.result.meta.TransactionResult,banlancechanges:xrpl.getBalanceChanges(tx.result.meta)}
  res.json(response)
  client.disconnect()
})

// End of acceptSellOffer()

// *******************************************************
// ********* Operational Accept Buy Offer ****************
// *******************************************************


// @desc  accept Buy Offer
// @route POST /api/v1/xrp/acceptbuyoffer
exports.acceptBuyOffer =asyncHandler(async(req,res,next)=>{
  const standby_wallet = xrpl.Wallet.fromSeed(process.env.COLD_SECRET)
  const operational_wallet = xrpl.Wallet.fromSeed(process.env.HOT_SECRET)
  const client = new Client(process.env.CLIENT)
  const {nfttokenbuyoffer} = req.body 
  await client.connect()

  // Prepare transaction -------------------------------------------------------
  const transactionBlob = {
    "TransactionType": "NFTokenAcceptOffer",
    "Account": operational_wallet.classicAddress,
    "NFTokenBuyOffer": nfttokenbuyoffer
  }
  // Submit transaction --------------------------------------------------------
  const tx = await client.submitAndWait(transactionBlob,{wallet: operational_wallet}) 
  const nfts = await client.request({
    method: "account_nfts",
    account: operational_wallet.classicAddress
  })
  results += JSON.stringify(nfts,null,2)
  operationalResultField.value = results

  // Check transaction results -------------------------------------------------
  results += "\n\nTransaction result:\n" + 
    JSON.stringify(tx.result.meta.TransactionResult, null, 2)
  results += "\nBalance changes:\n" +
    JSON.stringify(xrpl.getBalanceChanges(tx.result.meta), null, 2)
  operationalBalanceField.value = 
    (await client.getXrpBalance(operational_wallet.address))
  operationalBalanceField.value = 
    (await client.getXrpBalance(standby_wallet.address))
  operationalResultField.value = results
  const response ={txnresult:tx.result.meta.TransactionResult,nfts:nfts}
  res.json(response)
  client.disconnect()
})// End of acceptBuyOffer()


exports.autoBridging = asyncHandler(async(req,res,next)=>{
await client.connect()
const user_wallet =  Wallet.fromSeed(process.env.NEW_COLD_SECRET)
const issuer_wallet_aed = Wallet.fromSeed(process.env.HOT_SECRET);
const issuer_wallet_usd = Wallet.fromSeed(process.env.COLD_SECRET);

const paymentTransaction = {
  TransactionType: "Payment",
  Account: user_wallet.classicAddress,
  Destination: issuer_wallet_aed.classicAddress,
  DestinationTag: 12345,
  Amount: {
      issuer: issuer_wallet_usd.classicAddress,
      currency: 'USD',
      value: "1000"
  },
  SendMax: {
      issuer: issuer_wallet_usd.classicAddress,
      currency: 'AED',
      value: "96"
  }
}

// Sign and submit the payment transaction.
const payment_prepared = await client.autofill(paymentTransaction)
console.log("Creating trust line from hot address to issuer...")
const payment_signed = senderWallet.sign(payment_prepared)
const paymentResult =  await client.submitAndWait(payment_signed.tx_blob);

console.log('Auto-bridging result:', paymentResult.result.meta.TransactionResult);
res.json({trustSetResult:trustSetResult,
paymentResult:paymentResult})
client.disconnect()


})

exports.escrow =asyncHandler(async(req,res,next)=>{
  const {amount,cancelafter,finishafter,prevtransactionid,condition} = req.body
  await client.connect(process.env.CLIENT)
  const escrow_wallet = Wallet.fromSeed(process.env.NEW_COLD_SECRET)
  const destination_wallet = Wallet.fromSeed(process.env.COLD_SECRET)
  const escrow_transaction = {
    "TransactionType": "EscrowCreate",
    "Account": escrow_wallet.address,
    "Amount":amount, // Amount in drops (10,000 XRP)
    "CancelAfter": cancelafter,
    "Condition": condition,
    "Destination": destination_wallet.address,
    "DestinationTag": 23480,
    "FinishAfter": finishafter,
    "Flags": 0,
    "OwnerNode": "0000000000000000",
    "DestinationNode": "0000000000000000",
    "PreviousTxnID": prevtransactionid,
    "PreviousTxnLgrSeq": 28991004,
    "SourceTag": 11747,
  };
  

  const escrow_prepared = await client.autofill(escrow_transaction)
  const escrow_signed = escrow_wallet.sign(escrow_prepared)
  const escrow_result = await client.submitAndWait(escrow_signed.tx_blob)
  if(escrow_result.result.meta.TransactionResult == "tesSUCCESS"){
    res.json({success:escrow_result.result.meta.TransactionResult,txnURL: `https://testnet.xrpl.org/transactions/${escrow_signed.hash}`})
  }else{
    next(new ErrorResponse(`Error sending transaction:${escrow_result.result.meta.TransactionResult}`))
  }

  client.disconnect()

})