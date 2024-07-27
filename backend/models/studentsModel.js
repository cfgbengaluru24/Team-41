import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  class: {
    type: String,
    required: true,
  },
  annualIncome: {
    type: Number,
    required: true,
  },
  isEnrolled: {
    type: Boolean,
    required: true,
    default: false,
  },
  enrolledFrom: {
    type: Date,
    required: true,
  },
});

const Students = mongoose.model("Students", studentSchema);

export default Students;