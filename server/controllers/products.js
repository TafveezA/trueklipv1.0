
const Product = require('../models/productModel.js')
// @desc  get all products
// @route Get /api/v1/products
// @access Public
exports.getProducts = async(req,res,next)=>{
    try{
            const products = await Product.find({})
             res.status(200).json(products)
            }catch(error){
             res.status(500).json({message:error.message})
}
}


// @desc  get  product
// @route Get /api/v1/products/id
// @access Public
exports.getProduct = async(req,res,next)=>{
    try{
                    const {id} = req.params;
                    const product = await Product.findById(id)
                    res.status(200).json(product)
            
                }catch(error){
                    res.status(500).json({message:error.message})
            
                }
}

// @desc  create  product
// @route Post /api/v1/products
// @access Private
exports.createProduct = async(req,res,next)=>{
    try{
                    const product = await Product.create(req.body)
                    res.status(200).json(product)
                 
                }catch(error){
                 res.status(500).json({message:error.message})
                }
}


// @desc   update product
// @route Put /api/v1/products
// @access Private
exports.updateProduct = async(req,res,next)=>{
    try{
                    const {id} = req.params
                    const product = await Product.findByIdAndUpdate(id,req.body)
                    if(!product){
                   return  res.status(404).json({message:`can't find any item with give id ${id}`})
                    }
                    const updatedProduct = await Product.findById(id)
                    res.status(200).json(updatedProduct)
                    }
                    catch(error){
                    res.status(500).json({message:error.message})
            
                }
            }

// @desc  delete  product
// @route delete /api/v1/products
// @access Public
exports.deleteProduct = async(req,res,next)=>{
    try{const {id} = req.params
            const product = await Product.findByIdAndDelete(id,req.body)
            if(!product){
               return  res.status(404).json({message:`can't find the item with given id ${id}`})
            }
             res.status(200).json(product)
            }catch(error){
                res.status(500).json({message:error.message})
            }
}