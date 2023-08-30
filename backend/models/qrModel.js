const mongoose = require('mongoose')
const slugify = require('slugify')
const geocoder = require('../utils/geocoder')
const qrSchema =mongoose.Schema({
    truklipid:{
        type :Number,
        required:[true,'please enter the valid in integer klipid']
    },
    batchnumber:{
        type:String,
        required:true,
        default:""
    },
    mfgdate:{
    type:Number,
    required:Date.now()
    },
    expirydate:{
        type:Number,
        required:false,
        default: Date(2025,11,17)
    },
    warranty:{
        type:Number,
        required:false,
        default:Date(2025,11,17)
    },
    description:{
        type:String,
        required:false,
        default:""
    },
    img: { 
        type:Buffer, 
        required:false,
     },

},
    {
        timestamps:true
    }
)

const qrData = mongoose.model('QR',qrSchema)
qrSchema.pre('save',function(){
   //console.log('slugify ran',this.name)
   this.slug =slugify(this.name,{lower:true})
    next();
})

// geo code and create location field

qrSchema.pre('save',async function(next){
    const loc = await geocoder.geocode(this.address)
    this.location ={
        type:'Point',
        coordinates:[loc[0].longitude,loc[0].latitude]
    }
    //don't save address in db
    this.address = undefined
    
})

module.exports=qrData;