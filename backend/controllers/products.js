const ErrorResponse = require('../utils/errorResponse')
const Product = require('../models/productModel.js')
const asyncHandler = require('../middleware/async')
const geocoder = require('../utils/geocoder')
const productsdata =require('../_data/products.json')
const dotenv = require('dotenv')
const{Web3}=require("web3")
const ABI= require("../config/validationABI.json")



dotenv.config({path:'../config/config.env'})

const ALCHEMY_RPC_URL_SEPOLIA=process.env.ALCHEMY_RPC_URL_SEPOLIA
const CONTRACT_VALIDATION_ADDRESS=process.env.CONTRACT_ADDRESS_VALIDATION
console.log("contract address",CONTRACT_VALIDATION_ADDRESS)
const web3 =new Web3(ALCHEMY_RPC_URL_SEPOLIA)
const contract = new web3.eth.Contract(ABI,CONTRACT_VALIDATION_ADDRESS)



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
// @route POST /api/v1/products
// @access Private
exports.createProduct = asyncHandler(async(req,res,next)=>{
                   // Add user to req,body
                   console.log(req.user.id)
                    req.body.user = req.user.id
                   
                  //check for produced product
                  const producedProduct = await Product.findOne({user:req.user.id})
                  if(producedProduct && req.user.role !== 'admin'){
                  return next(
                    new ErrorResponse(`The user with ID ${req.user.id} has already published with a bootcamp`,400)
                  )
                  }
                  const product = await Product.create(req.body)
                  res.status(201).json({success:true,
                    data:product})
                 
                
})


// @desc   update product
// @route PUT /api/v1/products
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

// @desc  Get products within a radius
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

exports.sync = asyncHandler(async(req,res,next)=>{
  const { truklipid } = req.body;
    const expectedLength =7
      if (!truklipid || typeof truklipid !== 'string' || truklipid.length !== expectedLength) {
        return res.status(400).json({ error: 'Invalid input' });
      }
  

      const product = productsdata.find(prod => prod.truklipid === truklipid);
      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }
  
      const responseFromBlockchain = await contract.methods.validationResult(truklipid).call();
  
      const isGenuine = responseFromBlockchain === true;
  
      if (isGenuine) {
        const response = {
          product: product,
          validityFromBlockchain: true,
        };
        return res.json(response);
      } else {
        const response = {
            product: product,
            validityFromBlockchain: false,
            message:'product is not genuine',
          }
        return res.status(200).json(response);
      }
})