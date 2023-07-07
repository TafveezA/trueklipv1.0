const express = require('express')
const mongoose = require('mongoose')
const app = express()
const Product = require('./models/productModel.js')

app.use(express.json())

// routes
app.get('/', (req,res)=>{
res.send("Hello Node API")
})

app.get('/blog',(req,res)=>{
    res.send('hello tafveez is here')
})
app.get('/products',async(req,res)=>{
try{
const products = Product.find({})
 res.status(200).json(products)
}catch(error){
    res.status(500).json({message:error.message})
    
}
})
app.post('/products',async(req,res) =>{
    // console.log(res.body);
    // res.send(req.body)
    try{
        const product = await Product.create(req.body)
        res.status(200).json(product)
     
    }catch(error){
     res.status(500).json({message:error.message})
    }
})
mongoose.set("strictQuery",false)
mongoose.connect('mongodb+srv://tafveezahmad:z4Y2YeseDNJ1YOR6@cluster0.fqqtjkb.mongodb.net/?retryWrites=true&w=majority').then(
    ()=>{
        console.log('connected to mongodb')
        app.listen(3000,()=>{
            console.log('Node API app is runnning on port :3000')
        })
     
    }
).catch((error)=>{
    console.log(error)
})