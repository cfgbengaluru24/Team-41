import express from 'express';
const mongoose = require('mongoose');
import {
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
  getAllVolunteers
} from '../controllers/volunteerController.js';

const router = express.Router();

router.get('/', getAllStudents);
router.get('/:id', getStudentById);
router.post('/', createStudent);
router.put('/:id', updateStudent);
router.delete('/:id', deleteStudent);
router.get('/getAllVolunteers',getAllVolunteers)

export default router;