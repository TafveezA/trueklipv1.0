const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const morgan = require('morgan')
const cors = require('cors')
const errorHandler = require('./middleware/error')
const app = express()
const logger = require('./middleware/logger')
const connectDB = require('./config/db')

dotenv.config({path:'./config/config.env'})
const PORT = process.env.PORT ||5000
const NODE_ENV =process.env.NODE_ENV
connectDB()

app.use(express.json())
app.use(logger)
app.use(errorHandler)
app.use(cors({
    origin: 'http://localhost:3000',
  }));

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



const server =app.listen(PORT,
                console.log(`Node API app is runnning on ${NODE_ENV} enviornment port :${PORT}`)
)



//Handle unhandled promise rejections
process.on('unhandledRejection',(err,promise)=>{
    console.log(`Error:${err.message}`)
    server.close(()=>process.exit(1))
})
