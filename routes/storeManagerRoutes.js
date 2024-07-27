const express = require('express');
const router = express.Router();

const {register} = require('../controllers/storeManagerController');

router.route('/register').post(register);

module.exports = router;