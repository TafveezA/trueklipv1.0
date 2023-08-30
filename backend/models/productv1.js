const mongoose = require('mongoose');
// const slugify = require('slugify');

const productSchema = mongoose.Schema({
    truklipid: {
        type: String, 
        required: true
    },
    brandName: {
        type: String,
        required: true
    },
    producedBy: {
        type: String,
        required: true
    },
    manufacturedDate: {
        type: String,
        required: true
    },
    currentRetailerLocation: {
        type: String,
        required: true
    },
    bestBefore: {
        type: String,
        required: true
    },
    productType: {
        type: String,
        required: true
    },
    batchNo: {
        type: String,
        required: true
    },
    lotCount: {
        type: Number,
        required: true
    },
    serialNo: {
        type: String,
        required: true
    },
    imei: {
        type: String,
        required: true
    }
}, 
{
    timestamps: true
});

// // Pre-Save Middleware for Generating Slug
// productSchema.pre('save', function (next) {
//     this.slug = slugify(this.batchNo, { lower: true });
//     next();
// });

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
