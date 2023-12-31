const ErrorResponse = require('../utils/errorResponse')
const ProductInfo = require('../models/productv1.js')
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
exports.getProductsInfo = asyncHandler(async(req,res,next)=>{
            let query;
            let queryStr = JSON.stringify(req.query)
            queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g,match =>`$${match}`)
            //console.log(queryStr)
            query = ProductInfo.find(JSON.parse(queryStr))
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
exports.getProductInfo = asyncHandler(async(req,res,next)=>{
               const {id} = req.params;
                    const product = await ProductInfo.findById(id)
                    res.status(200).json(product)
            
               
})







// @desc  create  product
// @route POST /api/v2/products
// @access Private
exports.addProductInfo = asyncHandler(async(req,res,next)=>{
    const { truklipid } = req.body;
    const expectedLength =7
      if (!truklipid || typeof truklipid !== 'string' || truklipid.length !== expectedLength) {
        return res.status(400).json({ error: 'Invalid input' });
      }
  

      const productexist = await ProductInfo.findOne({truklipid:req.body.truklipid});
      if (productexist) {
        return res.status(404).json({ error: 'Product Already Exist with the given truklip Id' });
      }
                  const product = await ProductInfo.create(req.body)
                  res.status(201).json({success:true,
                    data:product})
                 
                
})


// @desc   update product
// @route PUT /api/v1/products
// @access Private
exports.updateProductInfo = asyncHandler(async(req,res,next)=>{
                    const {id} = req.params
                    const product = await ProductInfo.findByIdAndUpdate(id,req.body)
                    if(!product){
                   //return  res.status(404).json({message:`can't find any item with give id ${id}`})
                     return next(new ErrorResponse(`Product not found with id of ${req.params.id}`,404))
                    }
                    const updatedProduct = await ProductInfo.findById(id)
                    res.status(200).json(updatedProduct)
                    
              
            })
// @desc  delete  product
// @route delete /api/v1/products
// @access Public
exports.deleteProductInfo = asyncHandler(async(req,res,next)=>{
    const {id} = req.params
            const product = await ProductInfo.findByIdAndDelete(id,req.body)
            if(!product){
              // return  res.status(404).json({message:`can't find the item with given id ${id}`})
              return next(new ErrorResponse(`Product not found with id of ${req.params.id}`,404))
            }
             res.status(200).json(product)
            
})



exports.syncProductInfo = asyncHandler(async(req,res,next)=>{
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