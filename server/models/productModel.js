const mongoose = require('mongoose')
const slugify = require('slugify')
const geocoder = require('../utils/geocoder')
const productSchema =mongoose.Schema({
    name:{
        type :String,
        required:[true,'please enter the product name']
    },
    quantity:{
        type:Number,
        required:true,
        default:0
    },
    price:{
    type:Number,
    required:true
    },
    description:{
        type:String,
        required:false,
        default:""
    },
    location:{
        type:String,
        enum:['Point'],
        required:false
    },
    coordinates :{
        type: [Number],
        index:'2dsphere',
        required:false
    }
},
    {
        timestamps:true
    }
)

const Product = mongoose.model('Product',productSchema)
productSchema.pre('save',function(){
   //console.log('slugify ran',this.name)
   this.slug =slugify(this.name,{lower:true})
    next();
})

// geo code and create location field

productSchema.pre('save',async function(next){
    const loc = await geocoder.geocode(this.address)
    this.location ={
        type:'Point',
        coordinates:[loc[0].longitude,loc[0].latitude]
    }
    //don't save address in db
    this.address = undefined
    
})

module.exports=Product;