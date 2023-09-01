const express = require('express')
const {connectToXRPL, IssueAToken, configColdAddress, configHotAddress, createTrustLine, sendToken} = require('../controllers/xrp')
const router = express.Router()

router.route('/').get(connectToXRPL)
router.route('/configcoldwallet').get(configColdAddress)
router.route('/confighotwallet').get(configHotAddress)
router.route('/createtrustline').get(createTrustLine)
router.route('/sendtoken').get(sendToken)

module.exports = router;