const ErrorResponse = require('../utils/errorResponse')
const Product = require('../models/productModel.js')
const asyncHandler = require('../middleware/async')
const geocoder = require('../utils/geocoder')
// @desc  get all products
// @route Get /api/v1/products
// @access Public
exports.getProducts = asyncHandler(async(req,res,next)=>{
            let query;
            let queryStr = JSON.stringify(req.query)
            queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g,match =>`$${match}`)
            //console.log(queryStr)
            query = Product.find(JSON.parse(queryStr))
            const products = await query
             res.status(200).json(products).json({
              success:true,
              count:products.length,
              data:products
             })
            
})


// @desc  get  product
// @route Get /api/v1/products/id
// @access Public
exports.getProduct = asyncHandler(async(req,res,next)=>{
               const {id} = req.params;
                    const product = await Product.findById(id)
                    res.status(200).json(product)
            
               
})







// @desc  create  product
// @route Post /api/v1/products
// @access Private
exports.createProduct = asyncHandler(async(req,res,next)=>{
    
                    const product = await Product.create(req.body)
                    res.status(200).json(product)
                 
                
})


// @desc   update product
// @route Put /api/v1/products
// @access Private
exports.updateProduct = asyncHandler(async(req,res,next)=>{
                    const {id} = req.params
                    const product = await Product.findByIdAndUpdate(id,req.body)
                    if(!product){
                   //return  res.status(404).json({message:`can't find any item with give id ${id}`})
                     return next(new ErrorResponse(`Product not found with id of ${req.params.id}`,404))
                    }
                    const updatedProduct = await Product.findById(id)
                    res.status(200).json(updatedProduct)
                    
              
            })
// @desc  delete  product
// @route delete /api/v1/products
// @access Public
exports.deleteProduct = asyncHandler(async(req,res,next)=>{
    const {id} = req.params
            const product = await Product.findByIdAndDelete(id,req.body)
            if(!product){
              // return  res.status(404).json({message:`can't find the item with given id ${id}`})
              return next(new ErrorResponse(`Product not found with id of ${req.params.id}`,404))
            }
             res.status(200).json(product)
            
})

// @desc  Get bootcamps within a radius
// @route GET /api/v1/products/radius/:zipcode/:distance
// @access Public
exports.getProductsInRadius = asyncHandler(async(req,res,next)=>{
  const loc = await geocoder.geocode(zipcode);
  const lat =loc[0].latitude;
  const lng = loc[0].longitude;
  const radius = distance/3963;
  const products = await Product.find({
    location:{$geoWithin :{$centerSphere:[[lng,lat],radius]}}
  })
  res.status(200).json({
    success:true,
    count:products.length,
    data:products
  })
          
})