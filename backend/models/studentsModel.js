const mongoose = require('mongoose');

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
    default: false,
    required: false,
  },
  state: {
    type: String,
    required: true,
  },
  enrolledBy: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Donors',
  }],
  fundedFrom: {
    type: Date,
  },
  gender: {
    type: String,
    required: true,
  },
  indexNumber: {
    type: Number,
    required: true,
    default: 0
  }
});

// Middleware to calculate indexNumber before saving
studentSchema.pre('save', function (next) {
  const student = this;
  const currentDate = new Date();
  const daysEnrolled = (currentDate - new Date(student.fundedFrom)) / (1000 * 60 * 60 * 24);

  // Calculate weights for indexNumber
  const dateWeight = daysEnrolled;
  const incomeWeight = 1 / student.annualIncome;

  student.indexNumber = dateWeight + incomeWeight;
  next();
});

const Students = mongoose.model('Students', studentSchema);

module.exports = Students;