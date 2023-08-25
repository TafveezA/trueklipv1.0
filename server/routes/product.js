const express = require('express')

//const Product = require('./models/productModel.js')
const {getProducts,getProduct,updateProduct,createProduct,deleteProduct,getProductsInRadius,sync} = require('../controllers/products')
const router = express.Router()
const {protect,authorize} = require('../middleware/auth')
router.route('/radius/:zipcode/:distance').get(getProductsInRadius)
router.route('/').get(getProducts).post(authorize('admin'),protect,createProduct)

router.route('/:id').delete(authorize('admin','producer'),protect,deleteProduct).get(getProduct).put(authorize('admin'),protect,updateProduct)
router.route('/sync').post(sync)

module.exports = router;