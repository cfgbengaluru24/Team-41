import Students from '../models/studentsModel.js';

// Get all students, sorted by indexNumber in descending order
export const getAllStudents = async (req, res) => {
  try {
    const students = await Students.find().populate('enrolledBy', 'name amount').sort({ indexNumber: -1 });
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get student by ID
export const getStudentById = async (req, res) => {
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

// Create new student
export const createStudent = async (req, res) => {
  const { fullName, age, class: studentClass, annualIncome, isFunded, state, enrolledBy, enrolledFrom, fundedFrom, gender } = req.body;

  const newStudent = new Students({
    fullName,
    age,
    class: studentClass,
    annualIncome,
    isFunded,
    state,
    enrolledBy,
    enrolledFrom,
    fundedFrom,
    gender
  });

  try {
    const savedStudent = await newStudent.save();
    res.status(201).json(savedStudent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update student by ID
export const updateStudent = async (req, res) => {
  const { id } = req.params;
  const { fullName, age, class: studentClass, annualIncome, isFunded, state, enrolledBy, enrolledFrom, fundedFrom, gender } = req.body;

  try {
    const updatedStudent = await Students.findByIdAndUpdate(
      id,
      { fullName, age, class: studentClass, annualIncome, isFunded, state, enrolledBy, enrolledFrom, fundedFrom, gender },
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

// Delete student by ID
export const deleteStudent = async (req, res) => {
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