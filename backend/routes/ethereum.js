const express = require('express')
const {validateProduct, addProductDetails, addProductDetail, mintNFT, transferCertificate} = require('../controllers/ethereum')
const router = express.Router()
router.route('/').get(validateProduct)
router.route('/product').post(addProductDetails)
router.route('/testing').post(addProductDetail)
router.route('/mintnft').post(mintNFT)
router.route('/transfernft').post(transferCertificate)
module.exports = router;