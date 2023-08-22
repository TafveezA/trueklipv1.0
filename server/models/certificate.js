const mongoose = require('mongoose');
const slugify = require('slugify');
const geocoder = require('../utils/geocoder');

const certificateSchema = mongoose.Schema({
    klipid: {
        type: String,
        required: [true, 'TRUKlip id is required']
    },
    brandName: {
        type: String,
        required: true,
        default: "Roast Bread"
    },
    certificatedatetime: {
        type: Date, // Changed type to Date
        required: true, // Removed Date.now()
        default:Date.now()
    },
    expirydate: {
        type: Date, // Changed type to Date
        required: false,
        default: new Date(2025, 11, 17)
    },
    warranty: {
        type: Date, // Changed type to Date
        required: false,
        default: new Date(2025, 11, 17)
    },
    description: {
        type: String,
        required: false,
        default: ""
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    }
    
}, 
{
    timestamps: true
});

// Pre-Save Middleware for Generating Slug
productSchema.pre('save', function (next) {
    this.slug = slugify(this.batchnumber, { lower: true });
    next();
});

// Pre-Save Middleware for Geo Coding
productSchema.pre('save', async function (next) {
    const loc = await geocoder.geocode(this.address);
    this.location = {
        type: 'Point',
        coordinates: [loc[0].longitude, loc[0].latitude]
    };
    this.address = undefined;
    next();
});

const Certificate = mongoose.model('Product', productSchema);

module.exports = Product;
