const ErrorResponse = require('../utils/errorResponse')
const User = require('../models/User.js')
const asyncHandler = require('../middleware/async')
const bcrypt = require('bcryptjs')

// @desc  Register user
// @route Get /api/v1/auth/register
// @access Public
exports.registerUser = asyncHandler(async(req,res,next)=>{
const {name,email,password,role} = req.body;
const user = await User.create({
    name,
    email,
    password,
    role
})
const token = user.getSignedJwtToken()
     res.status(200).json({
      success:true,
      token:token
     })
    
})