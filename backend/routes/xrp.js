const express = require('express')
const {connectToXRPL, configColdAddress, configHotAddress, createTrustLine, sendToken, confirmBalance, tradeProduct, placeOffer} = require('../controllers/xrp')

const router = express.Router()

router.route('/').get(connectToXRPL)
router.route('/configcoldwallet').get(configColdAddress)
router.route('/confighotwallet').get(configHotAddress)
router.route('/createtrustline').get(createTrustLine)
router.route('/sendtoken').get(sendToken)
router.route('/checkbalance').get(confirmBalance)
//lookup offers
router.route('/tradeproduct').get(tradeProduct)

//place offers
router.route('/placeoffer').get(placeOffer)

module.exports = router;