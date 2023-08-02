

const asyncHandler = require('../middleware/async')
const ethers = require('ethers')



// @desc  get  validation of product
// @route Get /api/ethv1/validate
// @access Public
exports.validateProduct = asyncHandler(async(req,res,next)=>{
            const {id}= req.params
            console.log(id)
                          
             res.status(200).json({
              truklipId:id,
              success:true,
             })
            
})









