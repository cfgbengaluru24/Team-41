const Students =require('../models/studentsModel');
const Volunteer = require('../models/volunteer.models');

// getAllStudents , createStudent ,getSingleStudent, removeStudent
// export const getAllStudents = async (req, res) => {
//   try {
//     const students = await Students.find();
//     res.status(200).json(students);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Get student by ID
// export const getStudentById = async (req, res) => {
//   try {
//     const student = await Students.findById(req.params.id);
//     if (!student) {
//       return res.status(404).json({ message: 'Student not found' });
//     }
//     res.status(200).json(student);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// Create new student
//name,age,class,annualIncome,isFunded,state,gender
const createStudent = async (req, res) => {
  const { name, age, class:studentClass , annualIncome ,state,gender,school} = req.body;

  const newStudent = new Students({
    name,
    age,
    class: studentClass,
    annualIncome,
    state,
    gender,
    school
  });

  try {
    const savedStudent = await newStudent.save();
    res.status(201).json({savedStudent});
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports =  {createStudent};

// Update student by ID
// export const updateStudent = async (req, res) => {
//   const { id } = req.params;
//   const { fullName, age, class: studentClass, annualIncome } = req.body;

//   try {
//     const updatedStudent = await Students.findByIdAndUpdate(
//       id,
//       { fullName, age, class: studentClass, annualIncome },
//       { new: true }
//     );

//     if (!updatedStudent) {
//       return res.status(404).json({ message: 'Student not found' });
//     }

//     res.status(200).json(updatedStudent);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };

// // Delete student by ID
// export const deleteStudent = async (req, res) => {
//   const { id } = req.params;

//   try {
//     const deletedStudent = await Students.findByIdAndDelete(id);

//     if (!deletedStudent) {
//       return res.status(404).json({ message: 'Student not found' });
//     }

//     res.status(200).json({ message: 'Student deleted successfully' });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };
// export const getAllVolunteers = async (req, res) => {
//   try {
//       const volunteers = await Volunteer.find();
//       res.status(200).json(volunteers);
//   } catch (error) {
//       console.error(error);
//       res.status(500).json({ msg: 'Server error' });
//   }
// };
