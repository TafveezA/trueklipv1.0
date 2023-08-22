const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config({path:'/config.env'})
mongoose.set("strictQuery",false)
const connectDB =async()=>{
    await mongoose.connect(process.env.MONGO_URI).then(()=>{
        //console.log(process.env.MONGO_URI)
        console.log(`MongoDB Connected :`)
    }).catch((error)=>{
            console.log(error)
        })
   
    
}

module.exports = connectDB