const express = require('express')
const {validateProduct} = require('../controllers/smartcontract')
const router = express.Router()

router.route('/').get(validateProduct)

module.exports = router;