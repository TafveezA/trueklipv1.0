const mongoose = require('mongoose')

const userSchema =mongoose.Schema({
    name:{
        type :String,
        required:[true,'please enter the valid in integer klipid']
    },
    email:{
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: 'Email address is required',
        validate: [validateEmail, 'Please fill a valid email address'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
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
    }
    // location:{
    //     type:String,
    //     enum:['Point'],
    //     required:false
    // },
    // coordinates :{
    //     type: [Number],
    //     index:'2dsphere',
    //     required:false
    // }
},
    {
        timestamps:true
    }
)

const userSchema =  