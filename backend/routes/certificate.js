const express = require('express')
const { updatedCertificate, deleteCertificate, createCertificate, getCertificate, getcertificates,listCertificate } = require('../controllers/certificate');

const router = express.Router()
router.route('/:id').get(getCertificate).delete(deleteCertificate).put(updatedCertificate)
router.route('/').get(getcertificates).post(createCertificate)
router.route('/list').post(listCertificate)

module.exports = router;