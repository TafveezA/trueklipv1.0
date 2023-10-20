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
exports.listCertificate = asyncHandler(async (req, res, next) => {
  const { searchText, filter } = req.body;

  let query = {};

  if (searchText) {
    query.brandName = { $regex: searchText, $options: 'i' };
  }

  if (filter) {
    if (typeof filter.dateType === 'number' && filter.dateType >= 0 && filter.dateType <= 4) {
      const currentDate = new Date();
      const startOfCurrentDate = new Date(currentDate);
      startOfCurrentDate.setHours(0, 0, 0, 0);

      if (filter.dateType === 0) {
        // All Days
        query.certificateDateTime = { $exists: true }; 
      } else if (filter.dateType === 1) {
        // Today
        query.certificateDateTime = {
          $gte: startOfCurrentDate,
          $lt: new Date(currentDate.getTime() + 24 * 60 * 60 * 1000), 
        };
      } else if (filter.dateType === 2) {
        // This week
        const weekStartDate = new Date(startOfCurrentDate);
        weekStartDate.setDate(currentDate.getDate() - currentDate.getDay());
        const weekEndDate = new Date(weekStartDate);
        weekEndDate.setDate(weekStartDate.getDate() + 7);

        query.certificateDateTime = {
          $gte: weekStartDate,
          $lt: weekEndDate,
        };
      } else if (filter.dateType === 3) {
        // This month
        const monthStartDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
        const nextMonthStartDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);

        query.certificateDateTime = {
          $gte: monthStartDate,
          $lt: nextMonthStartDate,
        };
      } else if (filter.dateType === 4) {
        // This year
        const yearStartDate = new Date(currentDate.getFullYear(), 0, 1);
        const nextYearStartDate = new Date(currentDate.getFullYear() + 1, 0, 1);

        query.certificateDateTime = {
          $gte: yearStartDate,
          $lt: nextYearStartDate,
        };
      }
    }
  }

  const certificates = await Certificate.find(query);

  res.status(200).json({ success: true, certificates });
});


