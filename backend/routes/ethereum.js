const express = require('express')
const {validateProduct, addProduct, addProductDetails, addProductDetail} = require('../controllers/ethereum')
const router = express.Router()
//router.route('/').get(validateProduct)
router.route('/product').post(addProductDetails)
router.route('/testing').post(addProductDetail)
module.exports = router;