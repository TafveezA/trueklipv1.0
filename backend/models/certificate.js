const mongoose = require('mongoose');

const certificateSchema = new mongoose.Schema({
  truklipid: {
    type: String,
    required: true
  },
  brandName: {
    type: String,
    required: true
  },
  certificateDateTime: {
    type: Date,
    required:false,
    default:Date.now()
  },
  certificateDataFront: {
    type: String, 
    required: true
  },
  certificateDataBack: {
    type: String, 
    required: true
  }
}, {
  timestamps: true 
});

const Certificate = mongoose.model('Certificate', certificateSchema);

module.exports = Certificate;
