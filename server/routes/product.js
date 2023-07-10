const express = require('express')

//const Product = require('./models/productModel.js')
const {getProducts,getProduct,updateProduct,createProduct,deleteProduct} = require('../controllers/products')
const router = express.Router()

router.route('/').get(getProducts).post(createProduct)

router.route('/:id').delete(deleteProduct).get(getProduct).put(updateProduct)



    module.exports = router;