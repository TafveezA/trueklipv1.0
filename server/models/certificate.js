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
    required: true
  },
  certificateData: {
    type: String, // Assuming it's a Base64 string
    required: true
  }
}, {
  timestamps: true 
});

const Certificate = mongoose.model('Certificate', certificateSchema);

module.exports = Certificate;
