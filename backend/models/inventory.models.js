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
  
  clothesDetails: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "clothes",
      maxcapacity: Number,
    },
  ],
});
export default mongoose.model("inventory", inventory);
