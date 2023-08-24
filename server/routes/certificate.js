const express = require('express')
const {getCertificate} = require('../controllers/certificate')
const router = express.Router()

router.route('/:id').get(getCertificate)

module.exports = router;