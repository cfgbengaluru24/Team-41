const express = require('express');
const router = express.Router();

const {createStudent} = require('../controllers/volunteerController');

router.route('/createStudent').post(createStudent);

module.exports = router;