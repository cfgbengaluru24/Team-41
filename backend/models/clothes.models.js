const mongoose = require("mongoose");
//description,size,age,donatedBy,donatedTo,donatedStatus,donatedOn,clothType
const clothes = new mongoose.Schema({
  cloth: {
    type: String,
    required: true,
  },
  size: {
    type: String,
    required: true,
    enum: ["XS", "S", "M", "L", "XL", "XXL"],
  },
  age: {
    type: Number,
    required: true,
  },
  donatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "clothes_doner",
  },
  donatedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "inventory",
  },
  donatedStatus: {
    type: Boolean,
    default: false,
    required: true,
  },
  donatedOn: {
    type: Date,
    default: Date.now(),
    required: true,
  },
  space: {
    type: Boolean,
  },
  clothType: {
    type: String,
    required: true,
    enum: {
      values: ["jeans", "saree", "top", "footwear", "others"],
      message: "{VALUE} is not supported",
    },
  },
});
module.exports = mongoose.model("clothes", clothes);
