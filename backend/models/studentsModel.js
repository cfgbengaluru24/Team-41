import mongoose from "mongoose";

export const studentSchema = new mongoose.Schema({
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
});

export const Students = mongoose.models("Students", studentSchema);
