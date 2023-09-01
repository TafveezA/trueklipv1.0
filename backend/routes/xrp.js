const express = require('express')
const {connectToXRPL} = require('../controllers/xrp')
const router = express.Router()

router.route('/').get(connectToXRPL)

module.exports = router;