const express = require('express')
const {validateProduct, addProduct} = require('../controllers/ethereum')
const router = express.Router()
router.route('/').get(validateProduct)
router.route('/product').post(addProduct)
module.exports = router;