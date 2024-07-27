const mongoose = require('mongoose');

const donorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  fundingTo: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Students',
    required: true
  }]
});

module.exports = mongoose.model("Donors", donorSchema);
