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
  },
  phone: {
    type: String,
    required: true,
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
  inventory:{
    type:mongoose.Schema.ObjectId,
    ref:'inventory',
  }
});

const StoreManager = mongoose.model('store_manager', storeManagerSchema);

module.exports = StoreManager;
