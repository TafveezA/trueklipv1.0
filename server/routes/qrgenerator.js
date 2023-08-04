const express = require('express')
const {generateQR} = require('../controllers/qrgenerator')
const router = express.Router()

router.route('/').post(generateQR)

module.exports = router;