const express = require('express')
const {validateProductOnEOS, addProductOnEOS} = require('../controllers/eos')
const router = express.Router()

router.route('/').get(validateProductOnEOS)


module.exports = router;