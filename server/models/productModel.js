const mongoose = require('mongoose')
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
    }
},
    {
        timestamps:true
    }
)

const Product = mongoose.model('Product',productSchema)

module.exports=Product;