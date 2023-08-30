const ErrorResponse = require('../utils/errorResponse')
const Certificate = require('../models/certificate.js')
const asyncHandler = require('../middleware/async')
// Dummy data for testing
const certificates = require('../_data/certificate.json')




// @desc  get all certificates
// @route Get /api/v1/certificates
// @access Public
exports.getcertificates = asyncHandler(async(req,res,next)=>{
            let query;
            let queryStr = JSON.stringify(req.query)
            queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g,match =>`$${match}`)
            //console.log(queryStr)
            query = Certificate.find(JSON.parse(queryStr))
            const certificates = await query
             res.status(200).json(certificates).json({
              success:true,
              count:certificates.length,
              data:certificates
             })
            
})


// @desc  get  certificate
// @route Get /api/v1/certificates/id
// @access Public
exports.getCertificate = asyncHandler(async(req,res,next)=>{
               const {id} = req.params;
                    const certificate = await Certificate.findById(id)
                    res.status(200).json(certificate)
            
               
})







// @desc  create  Certificate
// @route POST /api/v1/certificates
// @access Private
exports.createCertificate = asyncHandler(async(req,res,next)=>{
                  
                  const certificate = await Certificate.create(req.body)
                  res.status(201).json({success:true,
                    data:certificate})
                 
                
})


// @desc   update certificate
// @route PUT /api/v1/certificates
// @access Private
exports.updatedCertificate = asyncHandler(async(req,res,next)=>{
                    const {id} = req.params
                    const certificate = await Certificate.findByIdAndUpdate(id,req.body)
                    if(!certificate){
                   //return  res.status(404).json({message:`can't find any item with give id ${id}`})
                     return next(new ErrorResponse(`certificate not found with id of ${req.params.id}`,404))
                    }
                    const updatedCertificate = await Certificate.findById(id)
                    res.status(200).json(updatedCertificate)
                    
              
            })


// @desc  delete  certificate
// @route delete /api/v1/certificates
// @access Public
exports.deleteCertificate = asyncHandler(async(req,res,next)=>{
    const {id} = req.params
            const certificate = await Certificate.findByIdAndDelete(id,req.body)
            if(!certificate){
              // return  res.status(404).json({message:`can't find the item with given id ${id}`})
              return next(new ErrorResponse(`Certificate not found with id of ${req.params.id}`,404))
            }
             res.status(200).json(certificate)
            
})


// @desc  create  Certificate
// @route POST /api/v1/certificates
// @access Private
exports.listCertificate = asyncHandler(async(req,res,next)=>{
                  

    res.status(200).json({success:true,
      certificates:certificates})
   
  
})
