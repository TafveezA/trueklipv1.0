const ErrorResponse = require('../utils/errorResponse')
const User = require('../models/User.js')
const asyncHandler = require('../middleware/async')
const bcrypt = require('bcryptjs')

// @desc  Register user
// @route Post /api/v1/auth/register
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




// @desc  login  user
// @route Get /api/v1/auth/register
// @access Public
exports.login = asyncHandler(async(req,res,next)=>{
    const {email,password} = req.body;
// validate email and password
if(!email || !password){
    return next(new ErrorResponse('Please provide an email and password',400))
}
//Check for user
const user = await User.findOne({email:email}).select('+password')

if(!user){
    return next(new ErrorResponse('Invalid credentials',401));

}
// check if password matches
const isMatch = await user.matchPassword(password);
if(! isMatch){

return next(new ErrorResponse('Invalid credentials',401))
}


         res.status(200).json({
          success:true,
          login:true
         })
        
    })