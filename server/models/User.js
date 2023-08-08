const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

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
        required: [true,'Email address is required'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
        default:""
    },
    role:{
        type: String,
        enum :['user','publisher'],
        default:'user'
    },
    password:{
        type: String,
        required:[true,'Please add a password'],
        minlength:6,
        select:false

    },
    resetPasswordToken:String,
    resetPasswordExpire: Date,
    createdAt:{
        type: Date,
        default:Date.now()
    }
   
},
    {
        timestamps:true
    }
)
// Encrypt password using bcrypt
userSchema.pre('save',async function(next){
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password,salt)
})

// Sign JWT and return
userSchema.methods.getSignedJwtToken = function (){
    return jwt.sign({id:this._id},process.env.JWT_SECRET,{expiresIn:process.env.JWT_EXPIRE})

}
userSchema.methods.matchPassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password)
}

module.exports = mongoose.model('User',userSchema);