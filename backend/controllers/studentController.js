const Students = require('../models/studentsModel');
const Donor = require('../models/money_donorModel');

const getAllStudents = async (req, res) => {
  try {
    const students = await Students.find().populate('enrolledBy', 'name amount').sort({ indexNumber: -1 });
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getStudentById = async (req, res) => {
  try {
    const student = await Students.findById(req.params.id).populate('enrolledBy', 'name amount');
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createStudent = async (req, res) => {
  const { fullName, age, class: studentClass, annualIncome, isFunded, state, enrolledBy, fundedFrom, gender, report } = req.body;

  const newStudent = new Students({
    fullName,
    age,
    class: studentClass,
    annualIncome,
    isFunded,
    state,
    enrolledBy,
    fundedFrom,
    gender,
    report
  });

  try {
    const savedStudent = await newStudent.save();
    res.status(201).json(savedStudent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateStudent = async (req, res) => {
  const { id } = req.params;
  const { fullName, age, class: studentClass, annualIncome, isFunded, state, enrolledBy, fundedFrom, gender, report } = req.body;

  try {
    const updatedStudent = await Students.findByIdAndUpdate(
      id,
      { fullName, age, class: studentClass, annualIncome, isFunded, state, enrolledBy, fundedFrom, gender, report },
      { new: true }
    );

    if (!updatedStudent) {
      return res.status(404).json({ message: 'Student not found' });
    }

    res.status(200).json(updatedStudent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteStudent = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedStudent = await Students.findByIdAndDelete(id);

    if (!deletedStudent) {
      return res.status(404).json({ message: 'Student not found' });
    }

    res.status(200).json({ message: 'Student deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const uploadStudentReport = async (req, res) => {
  const { id } = req.params;
  const { report } = req.body;

  try {
    const updatedStudent = await Students.findByIdAndUpdate(
      id,
      { report },
      { new: true }
    );

    if (!updatedStudent) {
      return res.status(404).json({ message: 'Student not found' });
    }

    res.status(200).json(updatedStudent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
  uploadStudentReport
};