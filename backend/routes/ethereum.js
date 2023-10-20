const express = require('express')
const {validateProduct, addProductDetails, addProductDetail, mintNFT, transferCertificate, addProductManufacturer, addProductDistributor, addProductRetailer, getStation} = require('../controllers/ethereum')
const router = express.Router()
router.route('/').get(validateProduct)
router.route('/product').post(addProductDetails)
router.route('/testing').post(addProductDetail)
router.route('/mintnft').post(mintNFT)
router.route('/transfernft').post(transferCertificate)
router.route('/mfg').post(addProductManufacturer)
router.route('/distributed').post(addProductDistributor)
router.route('/retailed').post(addProductRetailer)
router.route('/getstation').get(getStation)

module.exports = router;