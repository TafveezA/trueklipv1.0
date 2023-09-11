const express = require('express')
const {validateProductOnEOS, addProductOnEOS} = require('../controllers/eos')
const router = express.Router()

router.route('/').get(validateProductOnEOS)
router.route('/addproduct').post(addProduct)

module.exports = router;