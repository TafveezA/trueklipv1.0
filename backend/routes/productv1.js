const express = require('express')

//const Product = require('./models/productModel.js')
//const {protect,authorize} = require('../middleware/auth')
const {getProducts,getProduct,updateProduct,createProduct,deleteProduct,getProductsInRadius,sync} = require('../controllers/productv1.js')
const router = express.Router()

router.route('/radius/:zipcode/:distance').get(getProductsInRadius)
router.route('/').get(getProducts).post(createProduct)

router.route('/:id').delete(deleteProduct).get(getProduct).put(updateProduct)
router.route('/sync').post(sync)

module.exports = router;