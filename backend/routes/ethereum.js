const express = require('express')
const {validateProduct, addProduct, addProductDetails} = require('../controllers/ethereum')
const router = express.Router()
router.route('/').get(validateProduct)
router.route('/product').post(addProductDetails)
module.exports = router;