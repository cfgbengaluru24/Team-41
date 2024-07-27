const mongoose = require('mongoose');

// Define the student schema
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
  isFunded: {
    type: Boolean,
    required: true,
    default: false,
  },
  state: {
    type: String,
    required: true,
  },
  enrolledBy: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Donor',
    required: true
  }],
  enrolledFrom: {
    type: Date,
    required: true,
    default: Date.now
  },
  fundedFrom: {
    type: Date,
  },
  gender: {
    type: String,
    required: true,
    enum: ['Male', 'Female', 'Other']
  },
  indexNumber: {
    type: Number,
    required: true
  }
});

studentSchema.pre('save', function (next) {
  const student = this;
  const currentDate = new Date();
  const dateDifference = (currentDate - student.enrolledFrom) / (1000 * 60 * 60 * 24); 
  const incomeWeight = 1 / student.annualIncome; 
  const dateWeight = dateDifference; 
  student.indexNumber = dateWeight + incomeWeight;
  next();
});

studentSchema.index({ gender: 1, indexNumber: -1 });

const Students = mongoose.model("Students", studentSchema);

module.exports = Students;