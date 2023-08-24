const express = require('express')
const {validateProduct,validateProductOnEOS} = require('../controllers/smartcontract')
const router = express.Router()

router.route('/').get(validateProduct)
router.route('/:id').get(validateProductOnEOS)

module.exports = router;