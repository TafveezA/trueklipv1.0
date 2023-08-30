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
sendTokenResponse(user,200,res)
    
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


         sendTokenResponse(user,200,res)
        
    })

    const sendTokenResponse = (user,statusCode,res)=>{
        const token = user.getSignedJwtToken()
        const options = {
            expires: new Date(Date.now()+process.env.JWT_COOKIE_EXPIRE*24*60*60*1000),
            httpOnly:true
             }
        if(process.env.NODE_ENV ==='production'){
            options.secure =true;
        }

            res.status(statusCode).cookie('token',token,options).json({
                success:true,
                token:token})
    }
  
// @desc  Get Me
// @route GET /api/v1/auth/me
// @access Private
exports.getMe = asyncHandler(async(req,res,next)=>{
  const user = await User.findById(req.user.id)
  console.log(user)
   
  res.status(200).json({
    status:true,
    data:user,
    valid:true
    })
        
    })
    