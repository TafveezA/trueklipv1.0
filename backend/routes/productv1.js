const express = require('express')

//const Product = require('./models/productModel.js')
//const {protect,authorize} = require('../middleware/auth')
const {updateProductInfo,deleteProductInfo, getProductsInfo, syncProductInfo, addProductInfo, getProductInfo} = require('../controllers/productv1')
const router = express.Router()


router.route('/').get(getProductsInfo).post(addProductInfo)

router.route('/:id').delete(deleteProductInfo).get(getProductInfo).put(updateProductInfo)
router.route('/sync').post(syncProductInfo)

module.exports = router;