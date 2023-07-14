const fs = require('fs');
const mongoose = require('mongoose')
const colors = require('colors');
const dotenv = require('dotenv')
dotenv.config({path:'./config/config.env'})

const Product = require('./models/productModel')

mongoose.connect(process.env.MONGO_URI).then(()=>{
    //console.log(process.env.MONGO_URI)
    console.log(`MongoDB Connected :`)
}).catch((error)=>{
        console.log(error)
    })

    // read from DB
    const Product = JSON.parse(fs.readFileSync(`${__dirname}/_data/products.json`,'utf-8'))

    const importData = async() =>{
        try{
            await Product.create(products)
            console.log('Data Imported .. '.green.inverse)


        }catch(err){
         console.error(err)
        }
    }

    // delete data
    const deleteData = async() =>{
        try{
            await Product.deleteMany()
            console.log('Data Destroyed .. '.red.inverse)
             process.exit()

        }catch(err){
         console.error(err)
        }
    }

    if(process.argv[2]== '-i'){
        importData()

    }else if (process.argv[2] === '-d'){
        deleteData()
    }

    