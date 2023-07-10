const express = require('express')
const router = express.Router()
//const Product = require('./models/productModel.js')


router.get('/', (req,res)=>{
    res.send("Hello Node API")
    })
    
    router.get('/blog',(req,res)=>{
        res.send('hello tafveez is here')
    })
    router.get('/',async(req,res)=>{
    try{
    const products = await Product.find({})
     res.status(200).json(products)
    }catch(error){
     res.status(500).json({message:error.message})
        
    }
    })
    router.get('/:id',async(req,res)=>{
        try{
            const {id} = req.params;
            const product = await Product.findById(id)
            res.status(200).json(product)
    
        }catch(error){
            res.status(500).json({message:error.message})
    
        }
    })
    router.post('/',async(req,res) =>{
        // console.log(res.body);
        // res.send(req.body)
        try{
            const product = await Product.create(req.body)
            res.status(200).json(product)
         
        }catch(error){
         res.status(500).json({message:error.message})
        }
    })
    
    // update by id
    router.put('/:id',async(req,res)=>{
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
    })
    
    //delete product
    router.delete('/:id',async(req,res)=>{
        try{const {id} = req.params
        const product = await Product.findByIdAndDelete(id,req.body)
        if(!product){
           return  res.status(404).json({message:`can't find the item with given id ${id}`})
        }
         res.status(200).json(product)
        }catch(error){
            res.status(500).json({message:error.message})
        }
        })
    module.exports = router;