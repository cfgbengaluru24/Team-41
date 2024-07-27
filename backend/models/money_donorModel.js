import mongoose from "mongoose";

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

const Donors = mongoose.model("Donors", donorSchema);

export default Donors;