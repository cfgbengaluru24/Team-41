const mongoose = require('mongoose');
const Donors = require('./money_donorModel');  

//fullName,age,class,annualIncome,isFunded,state,gender
const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  class: {
    type: Number,
    required:true,
    min : 1,
  },
  school : {
    type:String,
    required:true,
  },
  annualIncome: {
    type: String,
    required: true,
  },
  isFunded: {
    type: Boolean,
    default:false,
  },
  state: {
    type: String,
    required: true,
  },
  fundedBy: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Donors'
  }],
  gender: {
    type: String,
    required: true,
  },
  indexNumber: {
    type: Number,
    required: true,
    default: 0
  },
  report: {
    type: String,  
  }
});

studentSchema.pre('save', function (next) {
  const student = this;
  const currentDate = new Date();
  const daysEnrolled = (currentDate - new Date(student.fundedFrom)) / (1000 * 60 * 60 * 24);

  const dateWeight = daysEnrolled;
  const incomeWeight = 1 / student.annualIncome;

  student.indexNumber = dateWeight + incomeWeight;
  next();
});

const Students = mongoose.model('Students', studentSchema);

module.exports = Students;