const express = require('express')
const {returnCertificate} = require('../controllers/certificate')
const router = express.Router()

router.route('/:id').get(returnCertificate)

module.exports = router;