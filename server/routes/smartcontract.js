const express = require('express')
const {validateProduct} = require('../controllers/smartcontract')
const router = express.Router()

router.route('/:id').get(validateProduct)

module.exports = router;