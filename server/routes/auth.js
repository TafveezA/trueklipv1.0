const express = require('express')
const {registerUser,login} = require('../controllers/auth')
const router = express.Router()

router.route('/register').post(registerUser)
router.route('/login').post(login)

module.exports = router;