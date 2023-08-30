const mongoose = require('mongoose');
const slugify = require('slugify');
const geocoder = require('../utils/geocoder');



const distributorSchema = new mongoose.Schema({
    truklipId: {
        type: Number,
        required: true,
    },
    shipmentDate: {
        type: Number,
        required: true,
    },
    orderNumber: {
        type: Number,
        required: true,
    },
    hssCode: {
        type: Number,
        required: true,
    },
    barcode: {
        type: String,
        required: true,
    },
});

const customerSchema = new mongoose.Schema({
    klipId: {
        type: Number,
        required: true,
    },
    customerAddress: {
        type: String,
        required: true,
    },
    recieveDate: {
        type: Number,
        required: true,
    },
    invoiceNumber: {
        type: Number,
        required: true,
    },
    orderNumber: {
        type: Number,
        required: true,
    },
    otherDetails: {
        type: String,
    },
});

const retailerSchema = new mongoose.Schema({
    truklipId: {
        type: Number,
        required: true,
    },
    recieveDate: {
        type: Number,
        required: true,
    },
    pickDate: {
        type: Number,
        required: true,
    },
    packagingBarcode: {
        type: String,
        required: true,
    },
    otherDetails: {
        type: String,
    },
    orderNumber: {
        type: Number,
        required: true,
    },
    retailerAddress: {
        type: String,
        required: true,
    },
});




const productSchema = new mongoose.Schema(
    {
      klipid: {
        type: Number,
        required: [true, 'Please enter a valid integer truklipid']
      },
      batchnumber: {
        type: String,
        required: true,
        default: ""
      },
      mfgdate: {
        type: Date, 
        required: true 
      },
      expirydate: {
        type: Date, 
        required: false,
        default: new Date(2025, 11, 17)
      },
      warranty: {
        type: Date, 
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
      },
      certificate: String,
      productionData: String,
      otherDetails: String,
      truklipId: Number,
      producerId: Number,
      producerAddress: String,
      isConsumable: Boolean,
      distributorDetails: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Distributor'
      },
      retailerDetail: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Retailer'
      },
      customerDetails: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer'
      }
    },
    {
      timestamps: true
    }
  );







  // const productSchema = mongoose.Schema({
//     klipid: {
//         type: Number,
//         required: [true, 'Please enter a valid integer truklipid']
//     },
//     batchnumber: {
//         type: String,
//         required: true,
//         default: ""
//     },
//     mfgdate: {
//         type: Date, 
//         required: true 
//     },
//     expirydate: {
//         type: Date, 
//         required: false,
//         default: new Date(2025, 11, 17)
//     },
//     warranty: {
//         type: Date, 
//         required: false,
//         default: new Date(2025, 11, 17)
//     },
//     description: {
//         type: String,
//         required: false,
//         default: ""
//     },
//     user: {
//         type: mongoose.Schema.ObjectId,
//         ref: 'User',
//         required: true
//     }
    
// }, 
// {
//     timestamps: true
// });


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

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
