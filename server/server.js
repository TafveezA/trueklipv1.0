const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const morgan = require('morgan')
const app = express()
const logger = require('./middleware/logger')

//const Product = require('./models/productModel.js')
dotenv.config({path:'./config/config.env'})
const PORT = process.env.PORT ||5000
const NODE_ENV =process.env.NODE_ENV

app.use(express.json())
app.use(logger);

// morgan logger can be used durinmg development
if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'))
}

//setting middleware
app.use(express.urlencoded({extended:false}))

// route file
const products = require('./routes/product.js')

// mount routers
app.use('/api/v1/products',products)




mongoose.set("strictQuery",false)
mongoose.connect('mongodb+srv://tafveezahmad:z4Y2YeseDNJ1YOR6@cluster0.fqqtjkb.mongodb.net/?retryWrites=true&w=majority').then(
    ()=>{
        console.log('connected to mongodb')
        app.listen(PORT,()=>{
            console.log(`Node API app is runnning on ${NODE_ENV} enviornment port :${PORT}`)
        })
     
    }
).catch((error)=>{
    console.log(error)
})