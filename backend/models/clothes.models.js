const mongoose = require("mongoose");
//description,size,age,donatedBy,donatedTo,donatedStatus,donatedOn,clothType
const clothes = new mongoose.Schema({
  size: {
    type: String,
    required: true,
    enum: ["XS", "S", "M", "L", "XL", "XXL"],
  },
  age: {
    type: Number,
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
  },
  donatedOn: {
    type: Date,
    default: Date.now(),
    required: true,
  },
  clothType: {
    type: String,
    required: true,
    enum: {
      values: ["jeans", "saree", "top", "footwear", "others"],
      message: "{VALUE} is not supported",
    },
  },
  description : {
    type:String,
    default : `${this.clothType} of size ${this.size} is available`,
  },
  isAssignedToStore :{
    type:Boolean,
  }
});
module.exports = mongoose.model("clothes", clothes);

//donated status has to be update by the store manager -> update the inventory info
