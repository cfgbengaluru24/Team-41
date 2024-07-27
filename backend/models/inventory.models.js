const mongoose = require("mongoose");
const inventory = new mongoose.Schema({
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
  notifications: [
    {
      clothType: {
        type: String,
        enum: ['jeans', 'saree', 'top', 'footwear', 'others'],
      },
      donorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'clothes_doner'
      },
      clothId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'clothes'
      }
    }
  ],
  missHistory:[{
    clothType: {
      type: String,
      enum: ['jeans', 'saree', 'top', 'footwear', 'others'],
      required: true
    },
    missedTimes: {
      type: Number,
      default:0,
      required:true
    }
  }]
});
module.exports = mongoose.model("inventory", inventory);
