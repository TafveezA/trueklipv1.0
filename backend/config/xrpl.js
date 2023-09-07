const xrpl = require('xrpl')
const dotenv = require('dotenv')
const { connectToXRPL } = require('../controllers/xrp')
dotenv.config({path:'/config.env'})

const connectXRPL =async()=>{
    await xrpl.Client(process.env.CLIENT).then(()=>{
        //console.log(process.env.MONGO_URI)
        console.log(`XRPL Connected :`)
    }).catch((error)=>{
            console.log(error)
        })
   
    
}

module.exports = connectXRPL