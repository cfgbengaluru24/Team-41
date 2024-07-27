const express = require('express');
const {
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
  uploadStudentReport
} = require('../controllers/studentController');

const router = express.Router();

router.get('/', getAllStudents);
router.get('/:id', getStudentById);
router.post('/', createStudent);
router.put('/:id', updateStudent);
router.delete('/:id', deleteStudent);
router.put('/:id/report', uploadStudentReport);

module.exports = router;