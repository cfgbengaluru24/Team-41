const mongoose = require("mongoose");
const inventory = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "store_manager",
  },
  inventoryDetails: [{
    type:mongoose.Schema.ObjectId,
    ref : 'clothes'
  }],
  maxCapacityDetails: [
    {
      clothType: {
        type: String,
        enum: ['jeans', 'saree', 'top', 'footwear', 'others'],
        required: true
      },
      maxCapacity: {
        type: Number,
        required: [true, 'Please provide the maximum capacity for the cloth type']
      }
    }
  ],
});
module.exports = mongoose.model("inventory", inventory);
