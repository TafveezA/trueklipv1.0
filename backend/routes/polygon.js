const express = require('express')
const {addProductDetail} = require('../controllers/polygon')
const router = express.Router()
// router.route('/').get(validateProduct)
//router.route('/product').post(addProductDetails)
router.route('/testing').post(addProductDetail)
module.exports = router;