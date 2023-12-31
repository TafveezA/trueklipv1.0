const jwt =require('jsonwebtoken')
const asyncHandler = require('./async')
const ErrorResponse = require('../utils/errorResponse')
const User = require('../models/User')

//Protect routes

exports.protect = asyncHandler(async(req,res,next)=>{
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
    token = req.headers.authorization.split(' ')[1];
    }

    // make sure token exits
    if(!token){
        return next(new ErrorResponse('Not authorize to acces this route',401))
    }
    try{
     const decoded = jwt.verify(token,process.env.JWT_SECRET)
     console.log(decoded)
     req.user = await User.findById(decoded.id)
     console.log(req.user)
     next()
    }catch(err){


    }
})

//Authorize routes

exports.authorize = (...roles)=>{

return (req,res,next) =>{
if(!roles.includes(req.user.role)){
    return next(new ErrorResponse(`User role ${req.user.role} is unauthorize to acces this resource`,401))

}
next()
}


    
}