const mongoose = require('mongoose');

const storeManagerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
    minlength: 8
  },
  phone: {
    type: Number,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  inventoryDetails: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'clothes'
    }
  ],
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
  ]
});

const StoreManager = mongoose.model('store_manager', storeManagerSchema);

module.exports = StoreManager;
